package com.miljepetrovic.jobmeupapi.service.admin;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.miljepetrovic.jobmeupapi.dto.admin.AdminDto;
import com.miljepetrovic.jobmeupapi.dto.admin.AdminMapper;
import com.miljepetrovic.jobmeupapi.model.Admin;
import com.miljepetrovic.jobmeupapi.repository.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService {
    private static final Logger logger = LoggerFactory.getLogger(AdminServiceImpl.class);

    private final AdminRepository adminRepository;
    private final AdminMapper adminMapper;

    public AdminServiceImpl(AdminRepository adminRepository, AdminMapper adminMapper) {
        this.adminRepository = adminRepository;
        this.adminMapper = adminMapper;
    }

    @Override
    public List<AdminDto> findAllAdmins() {
        logger.debug("Fetching all admins");
        List<Admin> adminEntities = adminRepository.findAll();

        return adminEntities.stream().map(adminMapper::entityToDto).collect(Collectors.toList());
    }
}
