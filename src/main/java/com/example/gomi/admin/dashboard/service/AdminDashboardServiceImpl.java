package com.example.gomi.admin.dashboard.service;

import com.example.gomi.admin.dashboard.dto.AdminDashboardDto;
import com.example.gomi.area.repository.AreasRepository;
import com.example.gomi.category.repository.CategoriesRepository;
import com.example.gomi.item.entity.Item;
import com.example.gomi.item.repository.ItemRepository;
import com.example.gomi.item.repository.ItemSynonymRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class AdminDashboardServiceImpl implements AdminDashboardService {

    private final ItemRepository itemRepository;
    private final ItemSynonymRepository itemSynonymRepository;
    private final CategoriesRepository categoriesRepository;
    private final AreasRepository areasRepository;

    public AdminDashboardServiceImpl(ItemRepository itemRepository,
                                     ItemSynonymRepository itemSynonymRepository,
                                     CategoriesRepository categoriesRepository,
                                     AreasRepository areasRepository) {
        this.itemRepository = itemRepository;
        this.itemSynonymRepository = itemSynonymRepository;
        this.categoriesRepository = categoriesRepository;
        this.areasRepository = areasRepository;
    }

    @Override
    public AdminDashboardDto getDashboard() {
        AdminDashboardDto.Counts counts = new AdminDashboardDto.Counts(
                itemRepository.count(),
                itemRepository.countByActiveTrue(),
                itemRepository.countByActiveFalse(),
                categoriesRepository.count(),
                categoriesRepository.countByActiveTrue(),
                categoriesRepository.countByActiveFalse(),
                itemSynonymRepository.count(),
                areasRepository.count(),
                areasRepository.countByActiveTrue(),
                areasRepository.countByActiveFalse()
        );

        LocalDateTime start = LocalDate.now().atStartOfDay();
        LocalDateTime end = LocalDateTime.of(LocalDate.now(), LocalTime.MAX);

        AdminDashboardDto.TodayStats today = new AdminDashboardDto.TodayStats(
                itemRepository.countByCreatedAtBetween(start, end),
                itemRepository.countByUpdatedAtBetween(start, end),
                categoriesRepository.countByCreatedAtBetween(start, end),
                categoriesRepository.countByUpdatedAtBetween(start, end),
                areasRepository.countByCreatedAtBetween(start, end),
                areasRepository.countByUpdatedAtBetween(start, end)
        );

        List<AdminDashboardDto.ItemSummary> recentCreated = itemRepository
                .findTop5ByOrderByCreatedAtDesc()
                .stream()
                .map(this::toItemSummary)
                .collect(Collectors.toList());

        List<AdminDashboardDto.ItemSummary> recentUpdated = itemRepository
                .findTop5ByOrderByUpdatedAtDesc()
                .stream()
                .map(this::toItemSummary)
                .collect(Collectors.toList());

        return new AdminDashboardDto(counts, today, recentCreated, recentUpdated);
    }

    private AdminDashboardDto.ItemSummary toItemSummary(Item item) {
        String categoryNameKo = item.getCategories() == null
                ? null
                : item.getCategories().getCategoryNameKo();
        return new AdminDashboardDto.ItemSummary(
                item.getId(),
                item.getNameKo(),
                item.getNameJp(),
                categoryNameKo,
                item.getCreatedAt(),
                item.getUpdatedAt()
        );
    }
}
