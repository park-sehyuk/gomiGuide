package com.example.gomi.category.service;

import com.example.gomi.category.dto.CategoryDto;
import com.example.gomi.category.entity.Categories;
import com.example.gomi.category.repository.CategoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoriesRepository categoriesRepository;

    @Override
    public List<CategoryDto> getQuickCategory() {

        List<Categories> categories = categoriesRepository.findAllBy();

        return categories.stream().map(CategoryDto :: from).collect(Collectors.toList());
    }
}
