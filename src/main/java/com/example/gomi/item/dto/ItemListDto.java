package com.example.gomi.item.dto;

import com.example.gomi.category.entity.Categories;
import com.example.gomi.item.entity.Item;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemListDto {
    private Long itemId;
    private String nameKo;
    private String nameJp;
    private Long categoryId;
    private String categoryCode;
    private String categoryNameKo;
    private boolean active;
    private LocalDateTime updatedAt;

    public static ItemListDto from(Item item) {
        ItemListDto dto = new ItemListDto();
        dto.itemId = item.getId();
        dto.nameKo = item.getNameKo();
        dto.nameJp = item.getNameJp();
        dto.active = item.isActive();
        dto.updatedAt = item.getUpdatedAt();

        Categories categories = item.getCategories();
        if (categories != null) {
            dto.categoryId = categories.getId();
            dto.categoryCode = categories.getCode();
            dto.categoryNameKo = categories.getNameKo();
        }

        return dto;
    }
}
