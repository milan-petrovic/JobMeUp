package com.miljepetrovic.jobmeupapi.dto.registered_user;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;

public class RegisteredUserDto {

    @Min(value = 0)
    @NotEmpty()
    public int id;

    @NotEmpty()
    public String email;

    @NotEmpty()
    public String password;

    @NotEmpty()
    public String type;

    @NotEmpty()
    public int actualId;
}
