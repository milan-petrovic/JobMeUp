package com.miljepetrovic.jobmeupapi.dto.authentication;

public class JwtResponseDto {
    private String jwtToken;

    public JwtResponseDto(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public String getJwtToken() {
        return jwtToken;
    }
}