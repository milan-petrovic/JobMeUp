package com.miljepetrovic.jobmeupapi.service.employment;

import java.util.List;

import com.miljepetrovic.jobmeupapi.dto.employment.EmploymentDto;
import com.miljepetrovic.jobmeupapi.dto.employment.EmploymentRequestDto;
import com.miljepetrovic.jobmeupapi.model.Employment;

public interface EmploymentService {
    List<EmploymentDto> findAllEmployments();
    EmploymentDto saveEmployment(EmploymentRequestDto employmentDto);
}
