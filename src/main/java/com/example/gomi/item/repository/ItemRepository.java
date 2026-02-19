package com.example.gomi.item.repository;

import com.example.gomi.item.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {

    @Query("select i from Item i join fetch i.categories c where i.active = true")
    List<Item> findAllByActiveTrue();

    long countByActiveTrue();

    long countByActiveFalse();

    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    long countByUpdatedAtBetween(LocalDateTime start, LocalDateTime end);

    List<Item> findTop5ByOrderByCreatedAtDesc();

    List<Item> findTop5ByOrderByUpdatedAtDesc();

    List<Item> findByNameKoContainingIgnoreCaseAndActiveTrue(String keyword);

    List<Item> findByNameJpContainingIgnoreCaseAndActiveTrue(String keyword);

    List<Item> findAllByCategories_IdAndActiveTrue(Long categoryId);

    @Query("select i from Item i join fetch i.categories c where c.categoryNameKo = :categoryNameKo and i.active = true")
    List<Item> findAllByCategoryNameKo(@Param("categoryNameKo") String categoryNameKo);
}
