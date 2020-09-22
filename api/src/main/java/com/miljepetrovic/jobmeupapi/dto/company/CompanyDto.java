package com.miljepetrovic.jobmeupapi.dto.company;

import javax.persistence.Id;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class CompanyDto {

    @Id()
    @Min(value = 0)
    public int id;

    @NotEmpty()
    @Size(min = 5, max = 48)
    public String email;

    @NotEmpty()
    @Size(min = 6, max= 32)
    public String password;

    @NotEmpty()
    @Size(min = 3, max= 48)
    public String name;

    @NotEmpty()
    @Size(min = 5, max= 255)
    public String about;

    @NotEmpty()
    @Size(min = 3, max= 32)
    public String country;

    @NotEmpty()
    public int size;

    @NotEmpty()
    public int foundedYear;

    @NotEmpty()
    @Size(min = 3, max= 32)
    public String address;

    @NotEmpty()
    @Size(min = 9, max= 12)
    public String phoneNumber;
}
