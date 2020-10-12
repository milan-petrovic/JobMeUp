package com.miljepetrovic.jobmeupapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.miljepetrovic.jobmeupapi.model.JobOffer;

public interface JobOfferRepository extends JpaRepository<JobOffer, Integer> {
    List<JobOffer> findAllByActiveTrueAndEmployeeId(int employeeId);
    List<JobOffer> findAllByActiveFalseAndEmployeeId(int employeeId);
}
