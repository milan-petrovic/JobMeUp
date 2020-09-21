package com.miljepetrovic.jobmeupapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.miljepetrovic.jobmeupapi.model.Education;

public interface EducationRepository extends JpaRepository<Education, Integer> {
}
