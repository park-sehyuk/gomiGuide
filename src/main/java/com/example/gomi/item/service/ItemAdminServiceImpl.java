package com.example.gomi.item.service;

import com.example.gomi.category.entity.Categories;
import com.example.gomi.category.repository.CategoriesRepository;
import com.example.gomi.item.dto.CreateItemDto;
import com.example.gomi.item.dto.ItemDetailDto;
import com.example.gomi.item.dto.ItemListDto;
import com.example.gomi.item.dto.UpdateItemDto;
import com.example.gomi.item.entity.Item;
import com.example.gomi.item.entity.ItemSynonym;
import com.example.gomi.item.repository.ItemRepository;
import com.example.gomi.item.repository.ItemSynonymRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ItemAdminServiceImpl implements ItemAdminService{

    private final ItemRepository itemRepository;
    private final ItemSynonymRepository itemSynonymRepository;
    private final CategoriesRepository categoriesRepository;

    @Override
    public Long createItem(CreateItemDto dto) {
        Categories category = categoriesRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found : " + dto.getCategoryId()));

        // 엔티티 생성 방식은 프로젝트의 factory에 맞춰 생성
        Item item = Item.of(dto.getNameKo(), dto.getNameJp(), dto.getDescription(), category);
        itemRepository.save(item);

        List<ItemSynonym> synonyms = buildSynonyms(item, dto.getSynonyms());
        if(!synonyms.isEmpty())
            itemSynonymRepository.saveAll(synonyms);

        return item.getId();
    }



    @Override
    public void updateItem(Long itemId, UpdateItemDto dto) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new EntityNotFoundException("Item not found : " + itemId));

        // 1) Item 필드 수정 (setter 대신 change 메서드 권장)
        if (dto.getNameKo() != null || dto.getNameJp() != null)
            item.reName(dto.getNameKo(), dto.getNameJp());
        if (dto.getDescription() != null) item.changeDescription(dto.getDescription());
        if (dto.getActive() != null) item.changeActive(dto.getActive());

        if (dto.getCategoryId() != null) {
            Categories category = categoriesRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new EntityNotFoundException("Category not found: " + dto.getCategoryId()));
            item.changeCategory(category);
        }

        // 2) synonym 전체교체
        // - null이면 “synonym 변경 없음”(PATCH 스타일)
        // - 빈 리스트면 “전부 삭제”
        if (dto.getSynonyms() != null) {
            itemSynonymRepository.deleteAllByItem_Id(itemId);

            List<ItemSynonym> synonyms = buildSynonyms(item, dto.getSynonyms());
            if (!synonyms.isEmpty()) itemSynonymRepository.saveAll(synonyms);
        }
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


    private List<ItemSynonym> buildSynonyms(Item item, @Valid List<CreateItemDto.Synonym> synonyms) {

        if(synonyms == null || synonyms.isEmpty())
            return List.of();

        Map<String, CreateItemDto.Synonym>  unique = new LinkedHashMap<>();

        for(CreateItemDto.Synonym s : synonyms){
            if(s == null)
                continue;

            String keyword = normalize(s.getKeyword());

            if(keyword == null)
                continue;

            String lang = (s.getLang() == null) ? "UNKNOWN" : s.getLang().name();
            String key = lang + "::" + keyword.toLowerCase(Locale.ROOT);

            unique.put(key, new CreateItemDto.Synonym(keyword, s.getLang()));
        }

        return unique.values().stream().map(s -> ItemSynonym.itemSynonym(item, s.getKeyword(), s.getLang()))
                .collect(Collectors.toList());

    }

    private String normalize(String s) {
        if (s == null) return null;
        String v = s.trim();
        return v.isEmpty() ? null : v;
    }
}
