package com.example.gomi.item.repository;

import com.example.gomi.item.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findAllByActiveTrue();

    List<Item> findByNameKoContainingIgnoreCaseAndActiveTrue(String keyword);

    List<Item> findByNameJpContainingIgnoreCaseAndActiveTrue(String keyword);

    List<Item> findAllByCategories_IdAndActiveTrue(Long categoryId);

}
