package com.miljepetrovic.jobmeupapi.service.job_offer;

import java.util.List;

import com.miljepetrovic.jobmeupapi.dto.joboffer.JobOfferDto;
import com.miljepetrovic.jobmeupapi.model.JobOffer;

public interface JobOfferService {
    List<JobOfferDto> findAllJobOffers();
    List<JobOfferDto> findActiveEmployeesJobOffers(int employeeId);
}
