package com.miljepetrovic.jobmeupapi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.miljepetrovic.jobmeupapi.model.Company;

public interface CompanyRepository extends JpaRepository<Company, Integer> {
    Optional<Company> findByName(String name);
    Optional<Company> findByEmail(String email);
}
