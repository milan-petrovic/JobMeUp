package com.miljepetrovic.jobmeupapi.controller;

import java.net.URI;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miljepetrovic.jobmeupapi.dto.skill.SkillDto;
import com.miljepetrovic.jobmeupapi.exception.ExistingException;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;
import com.miljepetrovic.jobmeupapi.service.skill.SkillService;

@RestController
@RequestMapping("skills")
public class SkillController {
    private static final Logger logger = LoggerFactory.getLogger(SkillController.class);

    private final SkillService skillService;

    @Autowired
    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<SkillDto>> getAllSkills() {
        logger.info("GET /skills");

        return ResponseEntity.ok(skillService.findAllSkills());
    }

    @GetMapping(value = "/{skillId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SkillDto> getSkillById(@PathVariable(name = "skillId")int skillId) throws NonExistingException {
        logger.info("GET /skills/{}", skillId);

        return ResponseEntity.ok(skillService.findSkillById(skillId));
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> addNewSkill(@RequestBody SkillDto skillDto) throws ExistingException {
        logger.info("POST /skills {}", skillDto);

        SkillDto persistedSkill = skillService.saveSkill(skillDto);

        return ResponseEntity.created(URI.create(String.valueOf(persistedSkill.id))).build();
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SkillDto> putSkill(@RequestBody SkillDto skillDto) throws NonExistingException, ExistingException {
        logger.info("PUT /skills {}", skillDto);

        return ResponseEntity.ok(skillService.updateSkill(skillDto));
    }

    @DeleteMapping(value = "/{skillId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deleteSkill(@PathVariable(name = "skillId") int skillId) throws NonExistingException {
        logger.info("DELETE /skills/{}", skillId);

        skillService.deleteSkill(skillId);

        return ResponseEntity.accepted().build();
    }
}
