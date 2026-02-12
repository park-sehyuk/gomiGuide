package com.example.gomi.category.repository;

import com.example.gomi.category.entity.Categories;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoriesRepository extends JpaRepository<Categories, Long> {

    Optional<Categories> findByCode(String code);

    List<Categories> findAllByActiveTrueOrderBySortOrderAsc();

    boolean existsByCode(String code);

}
