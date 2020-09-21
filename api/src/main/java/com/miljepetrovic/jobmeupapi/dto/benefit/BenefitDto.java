package com.miljepetrovic.jobmeupapi.dto.benefit;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class BenefitDto {
    @Min(value = 0)
    public int id;

    @NotEmpty
    @Size(min = 5, max = 255)
    public String name;

    @Size(min = 5, max = 255)
    public String description;

    @Override
    public String toString() {
        return "BenefitDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
