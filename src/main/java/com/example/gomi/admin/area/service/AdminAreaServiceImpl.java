package com.example.gomi.admin.area.service;

import com.example.gomi.admin.area.dto.AdminAreaDto;
import com.example.gomi.area.constent.DayOfWeek;
import com.example.gomi.area.entity.AreaRules;
import com.example.gomi.area.entity.Areas;
import com.example.gomi.area.repository.AreaRulesRepository;
import com.example.gomi.area.repository.AreasRepository;
import com.example.gomi.category.entity.Categories;
import com.example.gomi.category.repository.CategoriesRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.time.LocalDate;
import java.time.LocalTime;

@Service
@Transactional
public class AdminAreaServiceImpl implements AdminAreaService {

    private static final Map<String, String> TYPE_TO_CATEGORY_CODE = Map.of(
            "burnable", "BURN",
            "nonburnable", "NON_BURN",
            "recyclable", "RESOURCE",
            "sodai", "SODAI"
    );

    private final AreasRepository areasRepository;
    private final AreaRulesRepository areaRulesRepository;
    private final CategoriesRepository categoriesRepository;
    private final HttpServletRequest request;

    public AdminAreaServiceImpl(AreasRepository areasRepository,
                                AreaRulesRepository areaRulesRepository,
                                CategoriesRepository categoriesRepository,
                                HttpServletRequest request) {
        this.areasRepository = areasRepository;
        this.areaRulesRepository = areaRulesRepository;
        this.categoriesRepository = categoriesRepository;
        this.request = request;
    }

    @Override
    @Transactional(readOnly = true)
    public List<AdminAreaDto> getAreas() {
        List<Areas> areas = areasRepository.findAll();
        List<String> ids = areas.stream().map(Areas::getId).toList();
        Map<String, List<AreaRules>> rulesByArea = new HashMap<>();
        if (!ids.isEmpty()) {
            rulesByArea = areaRulesRepository.findAllByAreas_IdInAndActiveTrue(ids)
                    .stream()
                    .collect(Collectors.groupingBy(r -> r.getAreas().getId()));
        }

        List<AdminAreaDto> result = new ArrayList<>();
        for (Areas area : areas) {
            List<AreaRules> rules = rulesByArea.getOrDefault(area.getId(), List.of());
            result.add(toDto(area, rules));
        }
        return result;
    }

    @Override
    public AdminAreaDto create(AdminAreaDto dto) {
        if (dto.getId() == null || dto.getId().isBlank()) {
            throw new IllegalArgumentException("area id is required");
        }
        if (areasRepository.existsById(dto.getId())) {
            throw new IllegalArgumentException("area id already exists");
        }

        Areas area = Areas.createAreas(
                dto.getId(),
                dto.getNameKo(),
                dto.getNameJp(),
                null,
                dto.getType(),
                dto.getNote(),
                dto.isActive()
        );

        areasRepository.save(area);
        saveRules(area, dto.getSchedule());

        return toDto(area, areaRulesRepository.findAllByAreas_IdAndActiveTrueOrderByDay(area.getId()));
    }

    @Override
    public AdminAreaDto update(String areaId, AdminAreaDto dto) {
        Areas area = areasRepository.findById(areaId)
                .orElseThrow(() -> new EntityNotFoundException("Area not found: " + areaId));

        AdminAreaDto before = toDto(area, areaRulesRepository.findAllByAreas_IdAndActiveTrueOrderByDay(areaId));

        String nextNameKo = dto.getNameKo() != null ? dto.getNameKo() : area.getNameKo();
        String nextNameJp = dto.getNameJp() != null ? dto.getNameJp() : area.getNameJp();
        area.reName(nextNameKo, nextNameJp);
        if (dto.getType() != null) area.changeType(dto.getType());
        area.changeNote(dto.getNote());
        area.changeActive(dto.isActive());

        if (dto.getSchedule() != null) {
            areaRulesRepository.deleteAllByAreas_Id(areaId);
            saveRules(area, dto.getSchedule());
        }

        return toDto(area, areaRulesRepository.findAllByAreas_IdAndActiveTrueOrderByDay(areaId));
    }

    @Override
    public void delete(String areaId) {
        Areas area = areasRepository.findById(areaId)
                .orElseThrow(() -> new EntityNotFoundException("Area not found: " + areaId));
        AdminAreaDto before = toDto(area, areaRulesRepository.findAllByAreas_IdAndActiveTrueOrderByDay(areaId));
        areaRulesRepository.deleteAllByAreas_Id(areaId);
        areasRepository.delete(area);
    }

    private AdminAreaDto toDto(Areas area, List<AreaRules> rules) {
        AdminAreaDto.Schedule schedule = buildSchedule(rules);
        return new AdminAreaDto(
                area.getId(),
                area.getType(),
                area.getNameKo(),
                area.getNameJp(),
                area.getNote(),
                area.isActive(),
                schedule
        );
    }

    private AdminAreaDto.Schedule buildSchedule(List<AreaRules> rules) {
        Map<String, List<Integer>> map = new HashMap<>();
        for (String key : TYPE_TO_CATEGORY_CODE.keySet()) {
            map.put(key, new ArrayList<>());
        }

        LocalTime timeStart = null;
        LocalTime timeEnd = null;
        LocalDate effectiveFrom = null;
        LocalDate effectiveTo = null;

        for (AreaRules rule : rules) {
            String code = rule.getCategories() != null ? rule.getCategories().getCode() : null;
            if (code == null) continue;
            int dayIndex = rule.getDayOfWeek().ordinal();
            TYPE_TO_CATEGORY_CODE.forEach((key, value) -> {
                if (value.equalsIgnoreCase(code)) {
                    map.get(key).add(dayIndex);
                }
            });

            if (timeStart == null && rule.getTimeStart() != null) timeStart = rule.getTimeStart();
            if (timeEnd == null && rule.getTimeEnd() != null) timeEnd = rule.getTimeEnd();
            if (effectiveFrom == null && rule.getEffectiveFrom() != null) effectiveFrom = rule.getEffectiveFrom();
            if (effectiveTo == null && rule.getEffectiveTo() != null) effectiveTo = rule.getEffectiveTo();
        }

        return new AdminAreaDto.Schedule(
                map.get("burnable"),
                map.get("nonburnable"),
                map.get("recyclable"),
                map.get("sodai"),
                timeStart != null ? timeStart.toString() : null,
                timeEnd != null ? timeEnd.toString() : null,
                effectiveFrom != null ? effectiveFrom.toString() : null,
                effectiveTo != null ? effectiveTo.toString() : null
        );
    }

    private void saveRules(Areas area, AdminAreaDto.Schedule schedule) {
        if (schedule == null) return;
        for (Map.Entry<String, String> entry : TYPE_TO_CATEGORY_CODE.entrySet()) {
            String key = entry.getKey();
            String code = entry.getValue();
            Categories categories = categoriesRepository.findByCode(code)
                    .orElseThrow(() -> new EntityNotFoundException("Category not found: " + code));
            List<Integer> days = getDaysByKey(schedule, key);
            if (days == null) continue;
            for (Integer day : days) {
                if (day == null || day < 0 || day > 6) continue;
                DayOfWeek dow = DayOfWeek.values()[day];
                AreaRules rule = AreaRules.areaRules(
                        area,
                        categories,
                        dow,
                        parseTime(schedule.getTimeStart()),
                        parseTime(schedule.getTimeEnd()),
                        null,
                        null,
                        parseDate(schedule.getEffectiveFrom()),
                        parseDate(schedule.getEffectiveTo()),
                        true
                );
                areaRulesRepository.save(rule);
            }
        }
    }

    private List<Integer> getDaysByKey(AdminAreaDto.Schedule schedule, String key) {
        return switch (key) {
            case "burnable" -> schedule.getBurnable();
            case "nonburnable" -> schedule.getNonburnable();
            case "recyclable" -> schedule.getRecyclable();
            case "sodai" -> schedule.getSodai();
            default -> List.of();
        };
    }

    private LocalTime parseTime(String value) {
        if (value == null || value.isBlank()) return null;
        return LocalTime.parse(value);
    }

    private LocalDate parseDate(String value) {
        if (value == null || value.isBlank()) return null;
        return LocalDate.parse(value);
    }

    // request kept for future audit needs
}
