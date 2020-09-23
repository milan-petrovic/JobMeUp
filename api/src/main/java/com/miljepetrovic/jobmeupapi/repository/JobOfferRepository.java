package com.miljepetrovic.jobmeupapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.miljepetrovic.jobmeupapi.model.JobOffer;

public interface JobOfferRepository extends JpaRepository<JobOffer, Integer> {
}
