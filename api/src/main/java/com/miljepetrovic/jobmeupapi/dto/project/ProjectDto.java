package com.miljepetrovic.jobmeupapi.dto.project;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class ProjectDto {
    @Min(value = 0)
    public int id;

    @NotEmpty()
    @Size(min = 5, max= 255)
    public String name;

    @NotEmpty()
    @Size(min = 5, max= 255)
    public String description;

    @NotEmpty()
    @Size(min = 5, max= 255)
    public String technicalStack;
}
