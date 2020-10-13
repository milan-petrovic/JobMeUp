package com.miljepetrovic.jobmeupapi.service.skill;

import java.util.List;

import com.miljepetrovic.jobmeupapi.dto.skill.SkillDto;
import com.miljepetrovic.jobmeupapi.exception.ExistingException;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;

public interface SkillService {
    List<SkillDto> findAllSkills();
    SkillDto findSkillById(int skillId) throws NonExistingException;
    SkillDto saveSkill(SkillDto skillDto) throws ExistingException;
    SkillDto updateSkill(SkillDto skillDto) throws ExistingException, NonExistingException;
    void deleteSkill(int skillId) throws NonExistingException;
}
