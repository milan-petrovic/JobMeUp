package com.miljepetrovic.jobmeupapi.service.job_offer;

import java.util.List;

import com.miljepetrovic.jobmeupapi.dto.joboffer.JobOfferDto;

public interface JobOfferService {
    List<JobOfferDto> findAllJobOffers();
}
