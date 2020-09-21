package com.miljepetrovic.jobmeupapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.miljepetrovic.jobmeupapi.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
