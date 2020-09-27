package com.miljepetrovic.jobmeupapi.service.admin;

import java.util.List;

import com.miljepetrovic.jobmeupapi.dto.admin.AdminDto;

public interface AdminService {
    List<AdminDto> findAllAdmins();
}
