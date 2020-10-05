package com.miljepetrovic.jobmeupapi.service.education;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.miljepetrovic.jobmeupapi.dto.education.EducationDto;
import com.miljepetrovic.jobmeupapi.dto.education.EducationMapper;
import com.miljepetrovic.jobmeupapi.dto.education.EducationRequestDto;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;
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

    @Override
    public EducationDto updateEducation(EducationRequestDto educationRequestDto) throws NonExistingException {
        logger.debug("Update education {}", educationRequestDto);

        if (educationRepository.findById(educationRequestDto.id).isPresent()) {
            Education education = educationRepository.findById(educationRequestDto.id).get();
            education.setName(educationRequestDto.name);
            education.setDescription(educationRequestDto.description);
            education.setStartYear(educationRequestDto.startYear);
            education.setEndYear(educationRequestDto.endYear);

            educationRepository.save(education);

            return educationMapper.entityToDto(education);
        } else {
            throw new NonExistingException("Couldn't find education with id: " + educationRequestDto.id);
        }
    }


    @Override
    public EducationDto findEducationById(int id) throws NonExistingException {
        Optional<Education> educationOptional = educationRepository.findById(id);

        if (educationOptional.isPresent()) {
            return educationMapper.entityToDto(educationOptional.get());
        } else {
            throw new NonExistingException("Couldn\'t find education with id: " + id);
        }
    }
}
