package com.miljepetrovic.jobmeupapi.service.education;

import java.util.List;

import com.miljepetrovic.jobmeupapi.dto.education.EducationDto;
import com.miljepetrovic.jobmeupapi.dto.education.EducationRequestDto;

public interface EducationService {
    List<EducationDto> findAllEducations();
    EducationDto saveEducation(EducationRequestDto educationDto);
}
