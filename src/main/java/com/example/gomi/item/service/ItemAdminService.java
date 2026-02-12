package com.example.gomi.item.service;

import com.example.gomi.item.dto.CreateItemDto;
import com.example.gomi.item.dto.ItemDetailDto;
import com.example.gomi.item.dto.ItemListDto;
import com.example.gomi.item.dto.UpdateItemDto;

import java.util.List;

public interface ItemAdminService {

    Long createItem(CreateItemDto dto);

    void updateItem(Long itemId, UpdateItemDto dto);

    ItemDetailDto getItem(Long itemId);

    List<ItemListDto> getItems(String keyword);

}
