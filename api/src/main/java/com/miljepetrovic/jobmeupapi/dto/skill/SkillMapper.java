package com.miljepetrovic.jobmeupapi.dto.skill;

import org.mapstruct.Mapper;
import org.mapstruct.Named;

import com.miljepetrovic.jobmeupapi.model.Skill;

@Mapper(componentModel = "spring")
public interface SkillMapper {
    SkillDto entityToDto(Skill entity);

    @Named("skillDtoInsert")
    Skill dtoToEntity(SkillDto dto);
}
