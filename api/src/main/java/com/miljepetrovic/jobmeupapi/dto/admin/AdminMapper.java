package com.miljepetrovic.jobmeupapi.dto.admin;

import org.mapstruct.Mapper;

import com.miljepetrovic.jobmeupapi.model.Admin;

@Mapper(componentModel = "spring")
public interface AdminMapper {
    AdminDto entityToDto(Admin entity);
    Admin dtoToEntity(AdminDto dto);
}
