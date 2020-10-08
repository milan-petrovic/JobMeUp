package com.miljepetrovic.jobmeupapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.miljepetrovic.jobmeupapi.model.Benefit;

@Repository
public interface BenefitRepository extends JpaRepository<Benefit, Integer> {
}
