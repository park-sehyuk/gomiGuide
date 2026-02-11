package com.example.gomi.item.dto;

import com.example.gomi.item.entity.ItemSynonym;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
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
    private List<ItemSynonym> synonyms;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ItemDetailDto(Long itemId, String nameKo, String nameJp, Long categoryId, String categoryCode, String categoryNameKo, String description, String officialUrl, boolean active, List<ItemSynonym> synonyms, LocalDateTime createdAt, LocalDateTime updatedAt){
        this.itemId = itemId;
        this.nameKo = nameKo;
        this.nameJp = nameJp;
        this.categoryId = categoryId;
        this.categoryCode = categoryCode;
        this.categoryNameKo = categoryNameKo;
        this.description = description;
        this.officialUrl = officialUrl;
        this.active = active;
        this.synonyms = synonyms;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @Getter
    @Setter
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

}
