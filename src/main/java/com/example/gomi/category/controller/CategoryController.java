package com.example.gomi.category.controller;

import com.example.gomi.category.dto.CategoryDto;
import com.example.gomi.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/category")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryDto>> getQuickCategory(){
        List<CategoryDto> quickCategory = categoryService.getQuickCategory();
        return ResponseEntity.ok(quickCategory);
    }

}
