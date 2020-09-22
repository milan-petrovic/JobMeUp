package com.miljepetrovic.jobmeupapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.miljepetrovic.jobmeupapi.model.Company;

public interface CompanyRepository extends JpaRepository<Company, Integer> {
}
