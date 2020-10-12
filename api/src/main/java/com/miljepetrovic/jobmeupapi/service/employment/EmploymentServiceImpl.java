package com.miljepetrovic.jobmeupapi.service.employment;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.miljepetrovic.jobmeupapi.dto.employment.EmploymentDto;
import com.miljepetrovic.jobmeupapi.dto.employment.EmploymentMapper;
import com.miljepetrovic.jobmeupapi.dto.employment.EmploymentRequestDto;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;
import com.miljepetrovic.jobmeupapi.model.Employment;
import com.miljepetrovic.jobmeupapi.repository.EmploymentRepository;

@Service
public class EmploymentServiceImpl implements EmploymentService {
    private final static Logger logger = LoggerFactory.getLogger(EmploymentServiceImpl.class);

    private final EmploymentRepository employmentRepository;
    private final EmploymentMapper employmentMapper;

    public EmploymentServiceImpl(EmploymentRepository employmentRepository, EmploymentMapper employmentMapper) {
        this.employmentRepository = employmentRepository;
        this.employmentMapper = employmentMapper;
    }

    @Override
    public List<EmploymentDto> findAllEmployments() {
        logger.debug("Fetching all employments");

        List<Employment> employmentEntities = employmentRepository.findAll();

        return employmentEntities.stream().map(employmentMapper::entityToDto).collect(Collectors.toList());
    }

    @Override
    public EmploymentDto findEmploymentById(int employmentId) throws NonExistingException {
        logger.debug("Fetching emplyoment by id: {}", employmentId);

        Optional<Employment> employmentOptional = employmentRepository.findById(employmentId);
        if (employmentOptional.isPresent()) {
            return employmentMapper.entityToDto(employmentOptional.get());
        } else {
            throw new NonExistingException("Couldn't find employment with id: " + employmentId);
        }
    }

    @Override
    public EmploymentDto saveEmployment(EmploymentRequestDto employmentDto) {
        logger.debug("Post new employment {}", employmentDto);

        Employment entityForSave = employmentMapper.requestDtoToEntity(employmentDto);
        Employment persistedEmployment = employmentRepository.save(entityForSave);

        return employmentMapper.entityToDto(persistedEmployment);
    }

    @Override
    public EmploymentDto updateEmployment(EmploymentRequestDto employmentRequestDto) throws NonExistingException {
        logger.debug("Updating employment {}", employmentRequestDto);

        Optional<Employment> employmentOptional = employmentRepository.findById(employmentRequestDto.id);
        if (employmentOptional.isPresent()) {
            Employment employment = employmentOptional.get();
            employment.setClient(employmentRequestDto.client);
            employment.setDescription(employmentRequestDto.description);
            employment.setPosition(employmentRequestDto.position);
            employment.setStartDate(employmentRequestDto.startDate);
            employment.setEndDate(employmentRequestDto.endDate);

            Employment editedEmployment = employmentRepository.save(employment);

            return employmentMapper.entityToDto(editedEmployment);
        } else {
            throw new NonExistingException("Couldn't find employment with id: ", employmentRequestDto.id);
        }
    }
}
