package com.example.gomi.item.service;

import com.example.gomi.category.repository.CategoriesRepository;
import com.example.gomi.item.dto.ItemDetailDto;
import com.example.gomi.item.dto.ItemListDto;
import com.example.gomi.item.entity.Item;
import com.example.gomi.item.entity.ItemSynonym;
import com.example.gomi.item.repository.ItemRepository;
import com.example.gomi.item.repository.ItemSynonymRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ItemServiceImpl implements ItemService{

    private final ItemRepository itemRepository;
    private final ItemSynonymRepository itemSynonymRepository;
    private final CategoriesRepository categoriesRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ItemListDto> getItems(String keyword) {
        List<Item> items;
        if (keyword == null || keyword.trim().isEmpty()) {
            items = itemRepository.findAllByActiveTrue();
        } else {
            items = itemRepository.findByNameKoContainingIgnoreCaseAndActiveTrue(keyword.trim());
        }

        return items.stream().map(ItemListDto::from).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ItemDetailDto getItem(Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new EntityNotFoundException("Item not found: " + itemId));

        List<ItemSynonym> synonyms = itemSynonymRepository.findAllByItem_Id(itemId);
        return ItemDetailDto.from(item, synonyms);
    }

    @Override
    public List<ItemListDto> getQuickItems(String categoryNameKo) {
        List<Item> items;

        items = itemRepository.findAllByCategoryNameKo(categoryNameKo.trim());

        return items.stream().map(ItemListDto::from).collect(Collectors.toList());

    }


}
