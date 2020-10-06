package com.miljepetrovic.jobmeupapi.service.registered_user;

import java.util.Optional;

import com.miljepetrovic.jobmeupapi.dto.registered_user.RegisteredUserDto;
import com.miljepetrovic.jobmeupapi.exception.ExistingException;

public interface RegisteredUserService {
    RegisteredUserDto saveRegisteredUser(RegisteredUserDto registeredUserDto) throws ExistingException;
}
