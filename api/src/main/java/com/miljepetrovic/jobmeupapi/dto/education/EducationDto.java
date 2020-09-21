package com.miljepetrovic.jobmeupapi.dto.education;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class EducationDto {

    @Min(value = 0)
    public int id;

    @NotEmpty()
    @Size(min = 5, max = 255)
    public String name;

    @Size(min = 5, max = 255)
    public String description;

    @NotEmpty()
    @Size(min = 4, max = 4)
    public String startYear;

    @NotEmpty()
    @Size(min = 4, max = 4)
    public String endYear;
}
