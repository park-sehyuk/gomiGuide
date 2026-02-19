package com.example.gomi.area.repository;

import com.example.gomi.area.entity.AreaRules;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AreaRulesRepository extends JpaRepository<AreaRules, Long> {

    @Query(value = """
    SELECT *
    FROM area_rules r
    WHERE r.area_id = :areaId
      AND r.is_active = 1
    ORDER BY FIELD(r.day_of_week, 'MON','TUE','WED','THU','FRI','SAT','SUN'),
             r.time_start IS NULL, r.time_start
""", nativeQuery = true)
    List<AreaRules> findAllByAreas_IdAndActiveTrueOrderByDay(@Param("areaId") String areaId);

    List<AreaRules> findAllByCategories_IdAndActiveTrue(Long categoryId);

    List<AreaRules> findAllByAreas_IdAndCategories_IdAndActiveTrue(String areaId, Long categoryId);

    List<AreaRules> findAllByAreas_IdInAndActiveTrue(List<String> areaIds);

    void deleteAllByAreas_Id(String areaId);
}
