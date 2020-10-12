package com.miljepetrovic.jobmeupapi.service.job_offer;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.miljepetrovic.jobmeupapi.dto.joboffer.JobOfferDto;
import com.miljepetrovic.jobmeupapi.dto.joboffer.JobOfferMapper;
import com.miljepetrovic.jobmeupapi.model.JobOffer;
import com.miljepetrovic.jobmeupapi.repository.JobOfferRepository;

@Service
public class JobOfferServiceImpl implements JobOfferService {
    private final static Logger logger = LoggerFactory.getLogger(JobOfferServiceImpl.class);

    private final JobOfferRepository jobOfferRepository;
    private final JobOfferMapper jobOfferMapper;

    public JobOfferServiceImpl(JobOfferRepository jobOfferRepository, JobOfferMapper jobOfferMapper) {
        this.jobOfferRepository = jobOfferRepository;
        this.jobOfferMapper = jobOfferMapper;
    }

    @Override
    public List<JobOfferDto> findAllJobOffers() {
        logger.debug("Fetching all job offers {}");
        List<JobOffer> jobOffers = jobOfferRepository.findAll();
        return jobOffers.stream().map(jobOfferMapper::entityToDto).collect(Collectors.toList());
    }

    @Override
    public List<JobOfferDto> findActiveEmployeesJobOffers(int employeeId) {
        logger.debug("Fetching active job offers for employee with id {}", employeeId);
        List<JobOffer> activeEmployeesJobOffers = jobOfferRepository.findAllByActiveTrueAndEmployeeId(employeeId);

        return activeEmployeesJobOffers.stream().map(jobOfferMapper::entityToDto).collect(Collectors.toList());
    }

    @Override
    public List<JobOfferDto> findDeclinedEmployeesJobOffers(int employeeId) {
        logger.debug("Fetching declined job offers for employee with id {]", employeeId);
        List<JobOffer> declinedEmployeesJobOffers = jobOfferRepository.findAllByActiveFalseAndEmployeeId(employeeId);

        return declinedEmployeesJobOffers.stream().map(jobOfferMapper::entityToDto).collect(Collectors.toList());
    }

    @Override
    public List<JobOfferDto> findActiveCompanysJobOffers(int companyId) {
        logger.debug("Fetching active job offers for company with id {}", companyId);
        List<JobOffer> activeCompanysJobOffers = jobOfferRepository.findAllByActiveTrueAndCompanyId(companyId);

        return activeCompanysJobOffers.stream().map(jobOfferMapper::entityToDto).collect(Collectors.toList());
    }

    @Override
    public List<JobOfferDto> findPastCompanysJobOffers(int companyId) {
        logger.debug("Fetching past job offers for company with id {}", companyId);
        List<JobOffer> pastCompanysJobOffers = jobOfferRepository.findAllByActiveFalseAndCompanyId(companyId);

        return pastCompanysJobOffers.stream().map(jobOfferMapper::entityToDto).collect(Collectors.toList());
    }

    @Override
    public void declineJobOffer(int jobOfferId) {
        logger.debug("Declining job offer with id {}", jobOfferId);
        Optional<JobOffer> optionalJobOffer = jobOfferRepository.findById(jobOfferId);
        if (optionalJobOffer.isPresent()) {
            JobOffer jobOffer = optionalJobOffer.get();
            jobOffer.setActive(false);
            jobOfferRepository.save(jobOffer);
        }
    }

    @Override
    public JobOfferDto saveJobOffer(JobOfferDto jobOfferDto) {
        logger.debug("Saving job offer {}", jobOfferDto);
        JobOffer jobOffer = jobOfferMapper.dtoToEntity(jobOfferDto);
        JobOffer persistedJobOffer = jobOfferRepository.save(jobOffer);

        return jobOfferDto;
    }
}
