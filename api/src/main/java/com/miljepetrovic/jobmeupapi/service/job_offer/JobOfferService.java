package com.miljepetrovic.jobmeupapi.service.job_offer;

import java.util.List;

import com.miljepetrovic.jobmeupapi.dto.joboffer.JobOfferDto;
import com.miljepetrovic.jobmeupapi.model.JobOffer;

public interface JobOfferService {
    List<JobOfferDto> findAllJobOffers();
    List<JobOfferDto> findActiveEmployeesJobOffers(int employeeId);
    List<JobOfferDto> findDeclinedEmployeesJobOffers(int employeeId);
    List<JobOfferDto> findActiveCompanysJobOffers(int companyId);
    List<JobOfferDto> findPastCompanysJobOffers(int companyId);
    JobOfferDto saveJobOffer(JobOfferDto jobOfferDto);
    void declineJobOffer(int jobOfferId);
}
