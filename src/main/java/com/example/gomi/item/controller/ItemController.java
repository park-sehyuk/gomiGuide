package com.example.gomi.item.controller;

import com.example.gomi.item.dto.ItemDetailDto;
import com.example.gomi.item.dto.ItemListDto;
import com.example.gomi.item.service.ItemAdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/items")
public class ItemController {

    private final ItemAdminService itemAdminService;

    @GetMapping
    public ResponseEntity<List<ItemListDto>> getList(
            @RequestParam(required = false) String keyword
    ) {
        List<ItemListDto> list = itemAdminService.getItems(keyword);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{itemId}")
    public ResponseEntity<ItemDetailDto> getOne(@PathVariable Long itemId) {
        ItemDetailDto dto = itemAdminService.getItem(itemId);
        return ResponseEntity.ok(dto);
    }
}
