package com.miljepetrovic.jobmeupapi.service.skill;

import java.util.List;

import com.miljepetrovic.jobmeupapi.dto.skill.SkillDto;
import com.miljepetrovic.jobmeupapi.exception.ExistingException;

public interface SkillService {
    List<SkillDto> findAllSkills();
    SkillDto saveSkill(SkillDto skillDto) throws ExistingException;
}
