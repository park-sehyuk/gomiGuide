package com.example.gomi.area.repository;

import com.example.gomi.area.entity.Areas;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AreasRepository extends JpaRepository<Areas, String> {

    Optional<Areas> findByIdAndActiveTrue(String id);

    List<Areas> findAllByActiveTrue();

    List<Areas> findAllByParentIdAndActiveTrue(String parentId);

    boolean existsById(String id);

}
