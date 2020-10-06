package com.miljepetrovic.jobmeupapi.dto.registered_user;

import org.mapstruct.Mapper;

import com.miljepetrovic.jobmeupapi.model.RegisteredUser;

@Mapper(componentModel = "spring")
public interface RegisteredUserMapper {
    RegisteredUserDto entityToDto(RegisteredUser entity);
    RegisteredUser dtoToEntity(RegisteredUserDto dto);
}
