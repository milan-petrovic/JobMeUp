package com.miljepetrovic.jobmeupapi.service.admin;

import java.util.List;

import com.miljepetrovic.jobmeupapi.dto.admin.AdminDto;
import com.miljepetrovic.jobmeupapi.exception.ExistingException;

public interface AdminService {
    List<AdminDto> findAllAdmins();
    AdminDto saveAdmin(AdminDto adminDto) throws ExistingException;
}
