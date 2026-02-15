package com.example.gomi.area.service;

import com.example.gomi.area.dto.AreaRuleDto;
import com.example.gomi.area.entity.AreaRules;
import com.example.gomi.area.repository.AreaRulesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AreaRuleServiceImpl implements AreaRuleService{

    private final AreaRulesRepository areaRulesRepository;

    @Override
    public List<AreaRuleDto> getDayOfWeek(String areaId) {
        List<AreaRules> dayOfWeek;

        dayOfWeek = areaRulesRepository.findAllByAreas_IdAndActiveTrueOrderByDay(areaId);

        return dayOfWeek.stream().map(AreaRuleDto::from).collect(Collectors.toList());
    }
}
