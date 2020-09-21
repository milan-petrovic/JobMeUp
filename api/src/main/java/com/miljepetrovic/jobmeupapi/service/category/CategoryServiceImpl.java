package com.miljepetrovic.jobmeupapi.service.category;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.miljepetrovic.jobmeupapi.dto.category.CategoryDto;
import com.miljepetrovic.jobmeupapi.dto.category.CategoryMapper;
import com.miljepetrovic.jobmeupapi.model.Category;
import com.miljepetrovic.jobmeupapi.repository.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {
    private static final Logger logger = LoggerFactory.getLogger(CategoryServiceImpl.class);

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public CategoryServiceImpl(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    @Override
    public List<CategoryDto> findAll() {
        logger.info("Getting categories {}");
        List<Category> categories = categoryRepository.findAll();
        return categories.stream().map(categoryMapper::entityToDto).collect(Collectors.toList());
    }
}
