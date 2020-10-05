package com.miljepetrovic.jobmeupapi.dto.employee;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.miljepetrovic.jobmeupapi.dto.category.CategoryDto;

public class EmployeeRequestDto {
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

    public String country;
}
