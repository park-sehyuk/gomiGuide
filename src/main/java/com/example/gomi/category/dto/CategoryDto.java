package com.example.gomi.category.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CategoryDto {

    private Long categoryId;
    private String code;
    private String nameKo;
    private String nameJp;
    private int sortOrder;
    private String colorToken;
    private String iconUrl;
    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public CategoryDto(Long categoryId, String code, String nameKo, String nameJp, int sortOrder, String colorToken, String iconUrl, boolean active, LocalDateTime createdAt, LocalDateTime updatedAt){
        this.categoryId = categoryId;
        this.code = code;
        this.nameKo = nameKo;
        this.nameJp = nameJp;
        this.sortOrder = sortOrder;
        this.colorToken = colorToken;
        this.iconUrl = iconUrl;
        this.active = active;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}
