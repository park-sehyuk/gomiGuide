package com.example.gomi.admin.dashboard.dto;

import java.time.LocalDateTime;
import java.util.List;

public class AdminDashboardDto {
    private Counts counts;
    private TodayStats today;
    private List<ItemSummary> recentCreatedItems;
    private List<ItemSummary> recentUpdatedItems;

    public AdminDashboardDto(Counts counts, TodayStats today,
                             List<ItemSummary> recentCreatedItems,
                             List<ItemSummary> recentUpdatedItems) {
        this.counts = counts;
        this.today = today;
        this.recentCreatedItems = recentCreatedItems;
        this.recentUpdatedItems = recentUpdatedItems;
    }

    public Counts getCounts() {
        return counts;
    }

    public TodayStats getToday() {
        return today;
    }

    public List<ItemSummary> getRecentCreatedItems() {
        return recentCreatedItems;
    }

    public List<ItemSummary> getRecentUpdatedItems() {
        return recentUpdatedItems;
    }

    public static class Counts {
        private long itemTotal;
        private long itemActive;
        private long itemInactive;
        private long categoryTotal;
        private long categoryActive;
        private long categoryInactive;
        private long synonymTotal;
        private long areaTotal;
        private long areaActive;
        private long areaInactive;

        public Counts(long itemTotal, long itemActive, long itemInactive,
                      long categoryTotal, long categoryActive, long categoryInactive,
                      long synonymTotal, long areaTotal, long areaActive, long areaInactive) {
            this.itemTotal = itemTotal;
            this.itemActive = itemActive;
            this.itemInactive = itemInactive;
            this.categoryTotal = categoryTotal;
            this.categoryActive = categoryActive;
            this.categoryInactive = categoryInactive;
            this.synonymTotal = synonymTotal;
            this.areaTotal = areaTotal;
            this.areaActive = areaActive;
            this.areaInactive = areaInactive;
        }

        public long getItemTotal() {
            return itemTotal;
        }

        public long getItemActive() {
            return itemActive;
        }

        public long getItemInactive() {
            return itemInactive;
        }

        public long getCategoryTotal() {
            return categoryTotal;
        }

        public long getCategoryActive() {
            return categoryActive;
        }

        public long getCategoryInactive() {
            return categoryInactive;
        }

        public long getSynonymTotal() {
            return synonymTotal;
        }

        public long getAreaTotal() {
            return areaTotal;
        }

        public long getAreaActive() {
            return areaActive;
        }

        public long getAreaInactive() {
            return areaInactive;
        }
    }

    public static class TodayStats {
        private long createdItems;
        private long updatedItems;
        private long createdCategories;
        private long updatedCategories;
        private long createdAreas;
        private long updatedAreas;

        public TodayStats(long createdItems, long updatedItems,
                          long createdCategories, long updatedCategories,
                          long createdAreas, long updatedAreas) {
            this.createdItems = createdItems;
            this.updatedItems = updatedItems;
            this.createdCategories = createdCategories;
            this.updatedCategories = updatedCategories;
            this.createdAreas = createdAreas;
            this.updatedAreas = updatedAreas;
        }

        public long getCreatedItems() {
            return createdItems;
        }

        public long getUpdatedItems() {
            return updatedItems;
        }

        public long getCreatedCategories() {
            return createdCategories;
        }

        public long getUpdatedCategories() {
            return updatedCategories;
        }

        public long getCreatedAreas() {
            return createdAreas;
        }

        public long getUpdatedAreas() {
            return updatedAreas;
        }
    }

    public static class ItemSummary {
        private Long itemId;
        private String nameKo;
        private String nameJp;
        private String categoryNameKo;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public ItemSummary(Long itemId, String nameKo, String nameJp,
                           String categoryNameKo, LocalDateTime createdAt,
                           LocalDateTime updatedAt) {
            this.itemId = itemId;
            this.nameKo = nameKo;
            this.nameJp = nameJp;
            this.categoryNameKo = categoryNameKo;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
        }

        public Long getItemId() {
            return itemId;
        }

        public String getNameKo() {
            return nameKo;
        }

        public String getNameJp() {
            return nameJp;
        }

        public String getCategoryNameKo() {
            return categoryNameKo;
        }

        public LocalDateTime getCreatedAt() {
            return createdAt;
        }

        public LocalDateTime getUpdatedAt() {
            return updatedAt;
        }
    }
}
