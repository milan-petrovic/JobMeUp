package com.miljepetrovic.jobmeupapi.service.skill;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.miljepetrovic.jobmeupapi.dto.skill.SkillDto;
import com.miljepetrovic.jobmeupapi.dto.skill.SkillMapper;
import com.miljepetrovic.jobmeupapi.exception.ExistingException;
import com.miljepetrovic.jobmeupapi.model.Skill;
import com.miljepetrovic.jobmeupapi.repository.SkillRepository;

@Service
public class SkillServiceImpl implements SkillService{
    private static final Logger logger = LoggerFactory.getLogger(SkillServiceImpl.class);

    private final SkillRepository skillRepository;
    private final SkillMapper skillMapper;

    public SkillServiceImpl(SkillRepository skillRepository, SkillMapper skillMapper) {
        this.skillRepository = skillRepository;
        this.skillMapper = skillMapper;
    }

    @Override
    public List<SkillDto> findAllSkills() {
        logger.debug("Find all skills");
        List<Skill> skillEntities = skillRepository.findAll();

        return skillEntities.stream().map(skillMapper::entityToDto).collect(Collectors.toList());
    }

    @Override
    public SkillDto saveSkill(SkillDto skillDto) throws ExistingException {
        logger.debug("Insert new skill {}", skillDto);
        Skill entity = skillMapper.dtoToEntity(skillDto);

        if (skillRepository.findByName(entity.getName()).isPresent()) {
            throw new ExistingException("Skill with name " + entity.getName() + " already exists.");
        }

        Skill persistedEntity = skillRepository.save(entity);

        return skillMapper.entityToDto(persistedEntity);
    }
}
