package com.miljepetrovic.jobmeupapi.dto.benefit;

import org.mapstruct.Mapper;
import org.mapstruct.Named;

import com.miljepetrovic.jobmeupapi.model.Benefit;


@Mapper(componentModel = "spring")
public interface BenefitMapper {
    BenefitDto entityToDto(Benefit entity);

    @Named("benefitDtoInsert")
    Benefit dtoToEntity(BenefitDto dto);
}
