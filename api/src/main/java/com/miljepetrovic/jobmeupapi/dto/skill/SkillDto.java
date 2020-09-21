package com.miljepetrovic.jobmeupapi.dto.skill;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class SkillDto {
    @Min(value = 0)
    public int id;

    @NotEmpty()
    @Size(min = 1, max = 255)
    public String name;
}
