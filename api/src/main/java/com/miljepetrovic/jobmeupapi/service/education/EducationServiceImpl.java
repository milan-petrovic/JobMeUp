package com.miljepetrovic.jobmeupapi.service.education;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.miljepetrovic.jobmeupapi.dto.education.EducationDto;
import com.miljepetrovic.jobmeupapi.dto.education.EducationMapper;
import com.miljepetrovic.jobmeupapi.dto.education.EducationRequestDto;
import com.miljepetrovic.jobmeupapi.model.Education;
import com.miljepetrovic.jobmeupapi.repository.EducationRepository;

@Service
public class EducationServiceImpl implements EducationService{
    private final static Logger logger = LoggerFactory.getLogger(EducationServiceImpl.class);

    private final EducationRepository educationRepository;
    private final EducationMapper educationMapper;

    public EducationServiceImpl(EducationRepository educationRepository, EducationMapper educationMapper) {
        this.educationRepository = educationRepository;
        this.educationMapper = educationMapper;
    }

    @Override
    public List<EducationDto> findAllEducations() {
        logger.debug("Fetching all educations");

        List<Education> educationEntities = educationRepository.findAll();
        return educationEntities.stream().map(educationMapper::entityToDto).collect(Collectors.toList());
    }

    @Override
    public EducationDto saveEducation(EducationRequestDto educationDto) {
        logger.debug("Save education {}", educationDto);

        Education educationForSave = educationMapper.requestDtoToEntity(educationDto);
        Education persistedEducation = educationRepository.save(educationForSave);

        return educationMapper.entityToDto(persistedEducation);
    }
}
