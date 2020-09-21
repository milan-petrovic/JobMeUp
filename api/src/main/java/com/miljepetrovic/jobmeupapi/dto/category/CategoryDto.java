package com.miljepetrovic.jobmeupapi.dto.category;


import java.util.List;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeDto;

public class CategoryDto {

    @Min(value = 0)
    public int id;

    @NotEmpty()
    @Size(min = 5, max = 48)
    public String name;

    @Size(min=5, max = 255)
    public String description;

    public List<EmployeeDto> employees;

    @Override
    public String toString() {
        return "CategoryDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", employees=" + employees +
                '}';
    }
}
