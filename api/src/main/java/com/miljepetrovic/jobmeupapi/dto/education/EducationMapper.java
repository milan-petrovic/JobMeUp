package com.miljepetrovic.jobmeupapi.dto.education;

import org.mapstruct.Mapper;

import com.miljepetrovic.jobmeupapi.model.Education;

@Mapper(componentModel = "spring")
public interface EducationMapper {
    EducationDto entityToDto(Education entity);
    Education dtoToEntity(EducationDto dto);
}
