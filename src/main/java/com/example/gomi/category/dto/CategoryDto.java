package com.example.gomi.category.dto;

import com.example.gomi.category.entity.Categories;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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


    public static CategoryDto from(Categories categories){
        CategoryDto dto = new CategoryDto();
        dto.categoryId = categories.getId();
        dto.code = categories.getCode();
        dto.nameKo = categories.getCategoryNameKo();
        dto.nameJp = categories.getCategoryNameJp();
        dto.iconUrl = categories.getIconUrl();

        return dto;
    }

}
