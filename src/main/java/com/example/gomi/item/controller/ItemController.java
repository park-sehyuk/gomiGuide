package com.example.gomi.item.controller;

import com.example.gomi.item.dto.ItemDetailDto;
import com.example.gomi.item.dto.ItemListDto;
import com.example.gomi.item.service.ItemAdminService;
import com.example.gomi.item.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/items")
public class ItemController {

    private final ItemService itemService;

    @GetMapping
    public ResponseEntity<List<ItemListDto>> getList(
            @RequestParam(required = false) String keyword
    ) {
        List<ItemListDto> list = itemService.getItems(keyword);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{itemId}")
    public ResponseEntity<ItemDetailDto> getOne(@PathVariable Long itemId) {
        ItemDetailDto dto = itemService.getItem(itemId);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/category/{categoryNameKo}")
    public ResponseEntity<List<ItemListDto>> getQuickList(@PathVariable String categoryNameKo){
        List<ItemListDto> list = itemService.getQuickItems(categoryNameKo);
        return ResponseEntity.ok(list);
    }

}
