package com.miljepetrovic.jobmeupapi.controller;

import java.net.URI;
import java.util.List;

import javax.print.attribute.standard.Media;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miljepetrovic.jobmeupapi.dto.category.CategoryDto;
import com.miljepetrovic.jobmeupapi.exception.ExistingException;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;
import com.miljepetrovic.jobmeupapi.model.Category;
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

    @GetMapping(value = "/{categoryId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CategoryDto> findCategoryById(@PathVariable(name = "categoryId") int categoryId) throws NonExistingException {
        logger.info("GET /categories/{}", categoryId);
        return ResponseEntity.ok(categoryService.findCategoryById(categoryId));
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postCategory(@RequestBody CategoryDto categoryDto) throws ExistingException {
        logger.info("POST /categories {}", categoryDto);

        CategoryDto persistedCategory = categoryService.saveCategory(categoryDto);

        return ResponseEntity.created(URI.create(String.valueOf(persistedCategory.id))).build();
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CategoryDto> putCategory(@RequestBody CategoryDto categoryDto) throws NonExistingException {
        logger.info("PUT /categories {}", categoryDto);

        CategoryDto updatedCategory = categoryService.updateCategory(categoryDto);

        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping(value = "/{categoryId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deleteCategory(@PathVariable(name = "categoryId") int categoryId) throws NonExistingException {
        logger.info("DELETE /categories/{}", categoryId);
        categoryService.deleteCategory(categoryId);

        return ResponseEntity.accepted().build();
    }
}
