package com.example.gomi.item.controller;

import com.example.gomi.item.dto.CreateItemDto;
import com.example.gomi.item.dto.ItemDetailDto;
import com.example.gomi.item.dto.ItemListDto;
import com.example.gomi.item.dto.UpdateItemDto;
import com.example.gomi.item.service.ItemAdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/items")
public class ItemAdminController {

    private final ItemAdminService itemAdminService;

    @PostMapping
    public ResponseEntity create(@Valid @RequestBody CreateItemDto dto){
        Long id = itemAdminService.createItem(dto);

        return ResponseEntity.created(URI.create("/api/admin/items/" + id)).build();
    }

    @PatchMapping("/{itemId}")
    public ResponseEntity<Void> update(@PathVariable Long itemId,
                                       @Valid @RequestBody UpdateItemDto dto) {
        itemAdminService.updateItem(itemId, dto);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{itemId}")
    public ResponseEntity<ItemDetailDto> getOne(@PathVariable Long itemId) {
        ItemDetailDto dto = itemAdminService.getItem(itemId);
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<List<ItemListDto>> getList(
            @RequestParam(required = false) String keyword
    ) {
        List<ItemListDto> list = itemAdminService.getItems(keyword);
        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> delete(@PathVariable Long itemId) {
        itemAdminService.deleteItem(itemId);
        return ResponseEntity.noContent().build();
    }

}
