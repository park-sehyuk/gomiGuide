package com.example.gomi.item.repository;

import com.example.gomi.item.entity.ItemSynonym;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemSynonymRepository extends JpaRepository<ItemSynonym, Long> {

    List<ItemSynonym> findAllByItem_Id(Long itemId);

    List<ItemSynonym> findAllByKeywordIgnoreCase(String keyword);

    void deleteAllByItem_Id(Long itemId);

}
