package com.miljepetrovic.jobmeupapi.service.benefit;

import java.util.List;

import com.miljepetrovic.jobmeupapi.dto.benefit.BenefitDto;
import com.miljepetrovic.jobmeupapi.exception.ExistingException;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;
import com.miljepetrovic.jobmeupapi.model.Benefit;

public interface BenefitService {
    List<BenefitDto> findAllBenefits();
    BenefitDto findBenefitById(int benefitId) throws NonExistingException;
    BenefitDto saveBenefit(BenefitDto benefitDto) throws ExistingException;
    BenefitDto updateBenefit(BenefitDto benefitDto) throws NonExistingException;
    void deleteBenefit(int benefitId) throws NonExistingException;
}
