package com.miljepetrovic.jobmeupapi.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miljepetrovic.jobmeupapi.dto.category.CategoryDto;
import com.miljepetrovic.jobmeupapi.service.category.CategoryService;

@RestController
@RequestMapping("categories")
public class CategoryController {
    private static final Logger logger = LoggerFactory.getLogger(CategoryController.class);

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        logger.info("GET /categories");

        return ResponseEntity.ok(categoryService.findAll());
    }
}
