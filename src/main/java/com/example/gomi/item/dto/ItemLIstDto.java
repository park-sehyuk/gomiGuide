package com.example.gomi.item.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ItemLIstDto {
    private Long itemId;
    private String nameKo;
    private String nameJp;
    private Long categoryId;
    private String categoryCode;
    private String categoryNameKo;
    private boolean active;
    private LocalDateTime updatedAt;

    public ItemLIstDto(Long itemId, String nameKo, String nameJp, Long categoryId, String categoryCode, String categoryNameKo, boolean active, LocalDateTime updatedAt){
        this.itemId = itemId;
        this.nameKo = nameKo;
        this.nameJp = nameJp;
        this.categoryId = categoryId;
        this.categoryCode = categoryCode;
        this.categoryNameKo = categoryNameKo;
        this.active = active;
        this.updatedAt = updatedAt;
    }

}
