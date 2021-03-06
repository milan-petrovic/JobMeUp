package com.miljepetrovic.jobmeupapi.controller;

import java.net.URI;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miljepetrovic.jobmeupapi.dto.joboffer.JobOfferDto;
import com.miljepetrovic.jobmeupapi.service.job_offer.JobOfferService;

@RestController
@RequestMapping("jobOffers")
public class JobOfferController {
    private final static Logger logger = LoggerFactory.getLogger(JobOfferController.class);

    private final JobOfferService jobOfferService;

    @Autowired
    public JobOfferController(JobOfferService jobOfferService) {
        this.jobOfferService = jobOfferService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<JobOfferDto>> getAllJobOffers() {
        logger.info("GET /jobOffers");
        List<JobOfferDto> jobOffers = jobOfferService.findAllJobOffers();
        return ResponseEntity.ok(jobOffers);
    }

    @GetMapping(value = "/active/employee/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<JobOfferDto>> getAllActiveEmployeesJobOffers(@PathVariable int employeeId) {
        logger.info("GET /jobOffers/active/employee/{}", employeeId);

        return ResponseEntity.ok(jobOfferService.findActiveEmployeesJobOffers(employeeId));
    }

    @GetMapping(value = "/declined/employee/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<JobOfferDto>> getAllDeclinedEmployeesJobOffers(@PathVariable int employeeId) {
        logger.info("GET /jobOffers/active/employee/{}", employeeId);

        return ResponseEntity.ok(jobOfferService.findDeclinedEmployeesJobOffers(employeeId));
    }

    @GetMapping(value = "/active/company/{companyId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<JobOfferDto>> getAllActiveCompanysJobOffers(@PathVariable(name = "companyId") int companyId) {
        logger.info("GET /jobOffers/active/company/{}", companyId);

        return ResponseEntity.ok(jobOfferService.findActiveCompanysJobOffers(companyId));
    }

    @GetMapping(value = "/past/company/{companyId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<JobOfferDto>> getAllPastCompanysJobOffers(@PathVariable(name = "companyId") int companyId) {
        logger.info("GET /jobOffers/past/company/{}", companyId);

        return ResponseEntity.ok(jobOfferService.findPastCompanysJobOffers(companyId));
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postJobOffer(@RequestBody JobOfferDto jobOfferDto) {
        logger.info("POST /joboffers {}", jobOfferDto);
        JobOfferDto persistedJobOffer = jobOfferService.saveJobOffer(jobOfferDto);

        return ResponseEntity.created(URI.create(String.valueOf(persistedJobOffer.company))).build();
    }

    @PostMapping(value = "/decline/{jobOfferId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> declineJobOffer(@PathVariable(name = "jobOfferId") int jobOfferId) {
        logger.info("POST /jobOffers/decline/{}", jobOfferId);
        jobOfferService.declineJobOffer(jobOfferId);

        return ResponseEntity.accepted().build();
    }
}
