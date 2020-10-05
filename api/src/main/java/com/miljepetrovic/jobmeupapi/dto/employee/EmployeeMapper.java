package com.miljepetrovic.jobmeupapi.dto.employee;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;

import com.miljepetrovic.jobmeupapi.dto.category.CategoryMapper;
import com.miljepetrovic.jobmeupapi.model.Employee;

@Mapper(componentModel = "spring", uses = {CategoryMapper.class})
public abstract class EmployeeMapper {

    @Named("employeeDto")
    @Mappings({
        @Mapping(target = "category", qualifiedByName = "categoryDto"),
        @Mapping(target = "receivedVotes", expression = "java( employee.getReceivedVotes().size() )"),
        @Mapping(target = "givenVotes", expression = "java( employee.getGivenVotes().size() )")
    })
    public abstract  EmployeeDto entityToDto(Employee employee);

    @Mappings({
            @Mapping(target = "category", qualifiedByName = "categoryDto"),
            @Mapping(target = "receivedVotes", ignore = true),
            @Mapping(target = "givenVotes", ignore=true)
    })
    public abstract EmployeeDto createdEntityToDto(Employee employee);

    @Named("employeeDtoInsert")
    @Mappings({
        @Mapping(target = "skills", ignore = true),
        @Mapping(target = "benefits", ignore = true),
        @Mapping(target = "projects", ignore = true),
        @Mapping(target = "educations", ignore = true),
        @Mapping(target = "employments", ignore = true),
        @Mapping(target = "receivedVotes", ignore = true),
        @Mapping(target = "givenVotes", ignore = true),
        @Mapping(target = "jobOffers", ignore = true),
        @Mapping(target = "contracts", ignore = true)
    })
    public abstract Employee dtoToEntity(EmployeeDto employeeDto);

    public abstract Employee requestDtoToEntity(EmployeeRequestDto requestDto);
}
