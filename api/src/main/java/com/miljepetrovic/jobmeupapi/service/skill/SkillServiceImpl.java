package com.miljepetrovic.jobmeupapi.service.skill;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.miljepetrovic.jobmeupapi.dto.skill.SkillDto;
import com.miljepetrovic.jobmeupapi.dto.skill.SkillMapper;
import com.miljepetrovic.jobmeupapi.exception.ExistingException;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;
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

    @Override
    public SkillDto findSkillById(int skillId) throws NonExistingException {
        logger.debug("Fetching skill with skillId {}", skillId);
        Optional<Skill> skillOptional = skillRepository.findById(skillId);

        if (skillOptional.isPresent()) {
            return skillMapper.entityToDto(skillOptional.get());
        } else {
            throw new NonExistingException("Couldn't find skill with skillId " + skillId);
        }
    }

    @Override
    public SkillDto updateSkill(SkillDto skillDto) throws ExistingException, NonExistingException {
        logger.debug("Updating skill {}", skillDto);

        Optional<Skill> skillOptional = skillRepository.findById(skillDto.id);
        if (skillOptional.isPresent()) {
            Skill skill = skillOptional.get();
            if (skillRepository.findByName(skillDto.name).isPresent()) {
                throw new ExistingException("Existing skill with name " + skillDto.name);
            } else {
                skill.setName(skillDto.name);
                skillRepository.save(skill);
            }

            return skillMapper.entityToDto(skill);
        } else {
            throw new NonExistingException("Couldn't find skill");
        }
    }

    @Override
    public void deleteSkill(int skillId) throws NonExistingException {
        logger.debug("Deleting skill with id {}", skillId);

        Optional<Skill> skillOptional = skillRepository.findById(skillId);

        if (skillOptional.isPresent()) {
            skillRepository.delete(skillOptional.get());
        } else {
            throw new NonExistingException("Couldn't find skill with skillId " + skillId);
        }
    }
}
