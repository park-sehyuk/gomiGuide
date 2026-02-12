package com.example.gomi.item.dto;

import com.example.gomi.category.entity.Categories;
import com.example.gomi.item.entity.Item;
import com.example.gomi.item.entity.ItemSynonym;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemDetailDto {
    private Long itemId;
    private String nameKo;
    private String nameJp;
    private Long categoryId;
    private String categoryCode;
    private String categoryNameKo;
    private String description;
    private String officialUrl;
    private boolean active;
    private List<ItemDetailDto.Synonym> synonyms;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Synonym{
        private Long synonymId;
        private String keyword;
        private String lang;

        public Synonym(Long synonymId, String keyword, String lang){
            this.synonymId = synonymId;
            this.keyword = keyword;
            this.lang = lang;
        }

    }

    public static ItemDetailDto from(Item item, List<ItemSynonym> synonyms) {
        ItemDetailDto dto = new ItemDetailDto();
        dto.itemId = item.getId();
        dto.nameKo = item.getNameKo();
        dto.nameJp = item.getNameJp();
        dto.description = item.getDescription();
        dto.officialUrl = item.getOfficialUrl();
        dto.active = item.isActive();
        dto.createdAt = item.getCreatedAt();
        dto.updatedAt = item.getUpdatedAt();

        Categories categories = item.getCategories();
        if (categories != null) {
            dto.categoryId = categories.getId();
            dto.categoryCode = categories.getCode();
            dto.categoryNameKo = categories.getNameKo();
        }

        if (synonyms == null || synonyms.isEmpty()) {
            dto.synonyms = List.of();
        } else {
            dto.synonyms = synonyms.stream()
                    .map(s -> new Synonym(
                            s.getId(),
                            s.getKeyword(),
                            s.getLang() == null ? null : s.getLang().name()))
                    .toList();
        }

        return dto;
    }
}
