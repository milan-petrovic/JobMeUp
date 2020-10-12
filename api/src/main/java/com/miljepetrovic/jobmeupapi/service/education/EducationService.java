package com.miljepetrovic.jobmeupapi.service.education;

import java.util.List;

import com.miljepetrovic.jobmeupapi.dto.education.EducationDto;
import com.miljepetrovic.jobmeupapi.dto.education.EducationRequestDto;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;

public interface EducationService {
    List<EducationDto> findAllEducations();
    EducationDto saveEducation(EducationRequestDto educationDto);
    EducationDto updateEducation(EducationRequestDto educationRequestDto) throws NonExistingException;
    EducationDto findEducationById(int id) throws NonExistingException;
    void deleteEducation(int educationId) throws NonExistingException;
}
