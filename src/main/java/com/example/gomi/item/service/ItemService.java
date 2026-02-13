package com.example.gomi.item.service;

import com.example.gomi.category.dto.CategoryDto;
import com.example.gomi.item.dto.ItemDetailDto;
import com.example.gomi.item.dto.ItemListDto;

import java.util.List;

public interface ItemService {
    List<ItemListDto> getItems(String keyword);

    ItemDetailDto getItem(Long itemId);

    List<ItemListDto> getQuickItems(String categoryNameKo);
}
