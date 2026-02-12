package com.example.gomi.area.repository;

import com.example.gomi.area.entity.AreaRules;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AreaRulesRepository extends JpaRepository<AreaRules, Long> {

    List<AreaRules> findAllByAreas_IdAndActiveTrue(String areaId);

    List<AreaRules> findAllByCategories_IdAndActiveTrue(Long categoryId);

    List<AreaRules> findAllByAreas_IdAndCategories_IdAndActiveTrue(String areaId, Long categoryId);
}
