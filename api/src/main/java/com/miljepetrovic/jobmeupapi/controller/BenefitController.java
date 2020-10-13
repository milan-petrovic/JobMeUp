package com.miljepetrovic.jobmeupapi.controller;

import java.net.URI;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miljepetrovic.jobmeupapi.dto.benefit.BenefitDto;
import com.miljepetrovic.jobmeupapi.exception.ExistingException;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;
import com.miljepetrovic.jobmeupapi.service.benefit.BenefitService;

@RestController
@RequestMapping("/benefits")
public class BenefitController {
    private final static Logger logger = LoggerFactory.getLogger(BenefitController.class);

    private final BenefitService benefitService;

    @Autowired
    public BenefitController(BenefitService benefitService) {
        this.benefitService = benefitService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<BenefitDto>> getAllBenefits() {
        logger.info("GET /benefits");

        return ResponseEntity.ok(benefitService.findAllBenefits());
    }

    @GetMapping(value = "/{benefitId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BenefitDto> getBenefitById(@PathVariable(name = "benefitId") int benefitId) throws NonExistingException {
        logger.info("GET /benefit/{}", benefitId);

        return ResponseEntity.ok(benefitService.findBenefitById(benefitId));
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postBenefit(@RequestBody BenefitDto benefitDto) throws ExistingException {
        logger.info("POST /benefit {}", benefitDto);

        BenefitDto persistedBenefit = benefitService.saveBenefit(benefitDto);

        return ResponseEntity.created(URI.create(String.valueOf(persistedBenefit.id))).build();
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BenefitDto> putBenefit(@RequestBody BenefitDto benefitDto) throws NonExistingException {
        logger.info("PUT /benefits {}", benefitDto);

        BenefitDto updatedBenefit = benefitService.updateBenefit(benefitDto);

        return ResponseEntity.ok(updatedBenefit);
    }

    @DeleteMapping(value = "/{benefitId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deleteBenefit(@PathVariable(name = "benefitId") int benefitId) throws NonExistingException {
        logger.info("DELETE /benefits/{}", benefitId);

        benefitService.deleteBenefit(benefitId);

        return ResponseEntity.accepted().build();
    }
}
