package com.miljepetrovic.jobmeupapi.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miljepetrovic.jobmeupapi.dto.benefit.BenefitDto;
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
}
