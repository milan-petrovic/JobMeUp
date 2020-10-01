package com.miljepetrovic.jobmeupapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.miljepetrovic.jobmeupapi.model.Employment;

@Repository
public interface EmploymentRepository extends JpaRepository<Employment, Integer> {
}
