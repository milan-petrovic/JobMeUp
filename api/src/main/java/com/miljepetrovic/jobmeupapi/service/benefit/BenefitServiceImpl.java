package com.miljepetrovic.jobmeupapi.service.benefit;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.miljepetrovic.jobmeupapi.dto.benefit.BenefitDto;
import com.miljepetrovic.jobmeupapi.dto.benefit.BenefitMapper;
import com.miljepetrovic.jobmeupapi.exception.ExistingException;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;
import com.miljepetrovic.jobmeupapi.model.Benefit;
import com.miljepetrovic.jobmeupapi.repository.BenefitRepository;

import jdk.jshell.spi.SPIResolutionException;

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

    @Override
    public BenefitDto findBenefitById(int benefitId) throws NonExistingException {
        logger.debug("Fetching benefit with id {}", benefitId);

        Optional<Benefit> benefitOptional = benefitRepository.findById(benefitId);
        if (benefitOptional.isPresent()) {
            return benefitMapper.entityToDto(benefitOptional.get());
        } else {
            throw new NonExistingException("Couldn't find benefit with id " + benefitId);
        }
    }

    @Override
    public BenefitDto saveBenefit(BenefitDto benefitDto) throws ExistingException {
        logger.debug("Saving benefit {}", benefitDto);
        if (benefitRepository.findBenefitByName(benefitDto.name).isPresent()) {
            throw new ExistingException("Existing benefit with name " + benefitDto.name);
        }

        Benefit benefit = benefitMapper.dtoToEntity(benefitDto);
        Benefit persistedBenefit = benefitRepository.save(benefit);

        return benefitMapper.entityToDto(persistedBenefit);
    }

    @Override
    public BenefitDto updateBenefit(BenefitDto benefitDto) throws NonExistingException {
        logger.debug("Updating benefit {}", benefitDto);
        Optional<Benefit> benefitOptional = benefitRepository.findById(benefitDto.id);
        if (benefitOptional.isPresent()) {
            Benefit benefit = benefitOptional.get();
            benefit.setName(benefitDto.name);
            benefit.setDescription(benefitDto.description);
            Benefit updatedBenefit = benefitRepository.save(benefit);

            return benefitMapper.entityToDto(updatedBenefit);
        } else {
            throw new NonExistingException("Couldn't find benefit");
        }
    }

    @Override
    public void deleteBenefit(int benefitId) throws NonExistingException {
        logger.debug("Deleting benefit {}", benefitId);

        Optional<Benefit> benefitOptional = benefitRepository.findById(benefitId);
        if (benefitOptional.isPresent()) {
            benefitRepository.delete(benefitOptional.get());
        } else {
            throw new NonExistingException("Couldn't find benefit");
        }
    }
}
