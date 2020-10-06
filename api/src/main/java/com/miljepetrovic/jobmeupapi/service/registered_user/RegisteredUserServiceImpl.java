package com.miljepetrovic.jobmeupapi.service.registered_user;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.miljepetrovic.jobmeupapi.dto.registered_user.RegisteredUserDto;
import com.miljepetrovic.jobmeupapi.dto.registered_user.RegisteredUserMapper;
import com.miljepetrovic.jobmeupapi.exception.ExistingException;
import com.miljepetrovic.jobmeupapi.model.RegisteredUser;
import com.miljepetrovic.jobmeupapi.repository.RegisteredUserRepository;

@Service
public class RegisteredUserServiceImpl implements RegisteredUserService {
    private static final Logger logger = LoggerFactory.getLogger(RegisteredUserServiceImpl.class);

    private final RegisteredUserRepository registeredUserRepository;
    private final RegisteredUserMapper registeredUserMapper;

    public RegisteredUserServiceImpl(RegisteredUserRepository registeredUserRepository, RegisteredUserMapper registeredUserMapper) {
        this.registeredUserRepository = registeredUserRepository;
        this.registeredUserMapper = registeredUserMapper;
    }

    @Override
    public RegisteredUserDto saveRegisteredUser(RegisteredUserDto registeredUserDto) throws ExistingException {
        RegisteredUser registeredUser = registeredUserMapper.dtoToEntity(registeredUserDto);

        if (registeredUserRepository.findRegisteredUserByEmail(registeredUserDto.email).isPresent()) {
            throw new ExistingException("Existing user with email: " + registeredUserDto.email);
        }  else {
            RegisteredUser persistedUser = registeredUserRepository.save(registeredUser);

            return registeredUserMapper.entityToDto(persistedUser);
        }
    }
}
