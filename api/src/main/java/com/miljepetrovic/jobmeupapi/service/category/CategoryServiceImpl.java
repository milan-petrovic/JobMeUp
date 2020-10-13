package com.miljepetrovic.jobmeupapi.service.category;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.miljepetrovic.jobmeupapi.dto.category.CategoryDto;
import com.miljepetrovic.jobmeupapi.dto.category.CategoryMapper;
import com.miljepetrovic.jobmeupapi.exception.ExistingException;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;
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
        List<Category> categoryEntities = categoryRepository.findAll();
        return categoryEntities.stream().map(categoryMapper::entityToDto).collect(Collectors.toList());
    }

    @Override
    public CategoryDto findCategoryById(int categoryId) throws NonExistingException {
        logger.info("Fetching category by id {}", categoryId);
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
        if (categoryOptional.isPresent()) {
            return categoryMapper.entityToDto(categoryOptional.get());
        } else {
            throw new NonExistingException("Couldn't find category with id " + categoryId);
        }
    }

    @Override
    public CategoryDto saveCategory(CategoryDto categoryDto) throws ExistingException {
        logger.info("Saving category {}", categoryDto);
        if (categoryRepository.findCategoryByName(categoryDto.name).isPresent()) {
            throw new ExistingException("Category with name {} already exists."  + categoryDto.name);
        }

        Category category = categoryMapper.dtoToEntity(categoryDto);
        category.setName(categoryDto.name);
        category.setDescription(categoryDto.description);
        Category persistedCategory = categoryRepository.save(category);

        return categoryMapper.entityToDto(persistedCategory);
    }

    @Override
    public void deleteCategory(int categoryId) throws NonExistingException {
        logger.info("Deleting category with {} id", categoryId);

        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
        if (categoryOptional.isPresent()) {
            categoryRepository.delete(categoryOptional.get());
        } else {
            throw new NonExistingException("Couldn't find category with id " + categoryId);
        }
    }

    @Override
    public CategoryDto updateCategory(CategoryDto categoryDto) throws NonExistingException {
        logger.info("Updating category {}", categoryDto);

        Optional<Category> categoryOptional = categoryRepository.findById(categoryDto.id);
        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();
            category.setName(categoryDto.name);
            category.setDescription(categoryDto.description);
            Category persistedCategory = categoryRepository.save(category);

            return categoryMapper.entityToDto(persistedCategory);
        } else {
            throw new NonExistingException("Couldn't find category");
        }
    }
}
