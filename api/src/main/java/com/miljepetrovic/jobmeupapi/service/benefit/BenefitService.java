package com.miljepetrovic.jobmeupapi.service.benefit;

import java.util.List;

import com.miljepetrovic.jobmeupapi.dto.benefit.BenefitDto;

public interface BenefitService {
    List<BenefitDto> findAllBenefits();
}
