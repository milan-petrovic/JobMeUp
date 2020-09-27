package com.miljepetrovic.jobmeupapi.dto.admin;

import javax.persistence.Id;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class AdminDto {

    @Id()
    @Min(value = 0)
    public int id;

    @NotEmpty()
    @Size(min = 5, max = 32)
    public String email;

    @NotEmpty()
    @Size(min = 6, max = 48)
    public String password;

    @NotEmpty()
    @Size(min = 5, max = 32)
    public String username;

    @Override
    public String toString() {
        return "AdminDto{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", username='" + username + '\'' +
                '}';
    }
}
