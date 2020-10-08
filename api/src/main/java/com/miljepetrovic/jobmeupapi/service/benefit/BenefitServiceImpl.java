package com.miljepetrovic.jobmeupapi.service.benefit;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.miljepetrovic.jobmeupapi.dto.benefit.BenefitDto;
import com.miljepetrovic.jobmeupapi.dto.benefit.BenefitMapper;
import com.miljepetrovic.jobmeupapi.model.Benefit;
import com.miljepetrovic.jobmeupapi.repository.BenefitRepository;

@Service
public class BenefitServiceImpl implements BenefitService {
    private final static Logger logger = LoggerFactory.getLogger(BenefitServiceImpl.class);

    private final BenefitRepository benefitRepository;
    private final BenefitMapper benefitMapper;

    public BenefitServiceImpl(BenefitRepository benefitRepository, BenefitMapper benefitMapper) {
        this.benefitRepository = benefitRepository;
        this.benefitMapper = benefitMapper;
    }

    @Override
    public List<BenefitDto> findAllBenefits() {
        logger.debug("Fetching all benefits");
        List<Benefit> benefitEntities = benefitRepository.findAll();

        return benefitEntities.stream().map(benefitMapper::entityToDto).collect(Collectors.toList());
    }
}
