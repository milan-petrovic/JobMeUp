package com.miljepetrovic.jobmeupapi.dto.employee;

import java.util.List;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.miljepetrovic.jobmeupapi.dto.benefit.BenefitDto;
import com.miljepetrovic.jobmeupapi.dto.category.CategoryDto;
import com.miljepetrovic.jobmeupapi.dto.education.EducationDto;
import com.miljepetrovic.jobmeupapi.dto.employment.EmploymentDto;
import com.miljepetrovic.jobmeupapi.dto.project.ProjectDto;
import com.miljepetrovic.jobmeupapi.dto.skill.SkillDto;

public class EmployeeDto {

    @Min( value = 0)
    public int id;

    @NotEmpty()
    @Size(min = 5, max = 48)
    public String email;

    @NotEmpty()
    @Size(min = 6, max= 32)
    public String password;

    @NotEmpty()
    @Size(min = 3, max = 48)
    public String firstName;

    @NotEmpty()
    @Size(min = 3, max = 48)
    public String lastName;

    @NotEmpty()
    public String about;

    public CategoryDto category;

    public String expectedSalary;

    public List<SkillDto> skills;

    public List<BenefitDto> benefits;

    public List<ProjectDto> projects;

    public List<EducationDto> educations;

    public List<EmploymentDto> employments;

    public int receivedVotes;

    public int givenVotes;

    @Override
    public String toString() {
        return "EmployeeDto{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", about='" + about + '\'' +
                ", category=" + category +
                ", expectedSalary='" + expectedSalary + '\'' +
                ", skills=" + skills +
                ", benefits=" + benefits +
                ", projects=" + projects +
                ", educations=" + educations +
                ", employments=" + employments +
                ", receivedVotes=" + receivedVotes +
                ", givenVotes=" + givenVotes +
                '}';
    }
}
