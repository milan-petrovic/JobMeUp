package com.miljepetrovic.jobmeupapi.dto.benefit;

import org.mapstruct.Mapper;

import com.miljepetrovic.jobmeupapi.model.Benefit;

@Mapper(componentModel = "spring")
public interface BenefitMapper {
    BenefitDto entityToDto(Benefit entity);
    Benefit dtoToEntity(BenefitDto dto);
}
