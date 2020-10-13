package com.miljepetrovic.jobmeupapi.service.admin;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.miljepetrovic.jobmeupapi.dto.admin.AdminDto;
import com.miljepetrovic.jobmeupapi.dto.admin.AdminMapper;
import com.miljepetrovic.jobmeupapi.dto.registered_user.RegisteredUserDto;
import com.miljepetrovic.jobmeupapi.exception.ExistingException;
import com.miljepetrovic.jobmeupapi.model.Admin;
import com.miljepetrovic.jobmeupapi.model.RegisteredUser;
import com.miljepetrovic.jobmeupapi.repository.AdminRepository;
import com.miljepetrovic.jobmeupapi.repository.RegisteredUserRepository;
import com.miljepetrovic.jobmeupapi.service.registered_user.RegisteredUserService;

@Service
public class AdminServiceImpl implements AdminService {
    private static final Logger logger = LoggerFactory.getLogger(AdminServiceImpl.class);

    private final AdminRepository adminRepository;
    private final AdminMapper adminMapper;
    private final RegisteredUserRepository registeredUserRepository;
    private final RegisteredUserService registeredUserService;
    private final PasswordEncoder bcryptEncoder;

    public AdminServiceImpl(AdminRepository adminRepository, RegisteredUserRepository registeredUserRepository, PasswordEncoder bcryptEncoder, AdminMapper adminMapper, RegisteredUserService registeredUserService) {
        this.adminRepository = adminRepository;
        this.registeredUserRepository = registeredUserRepository;
        this.bcryptEncoder = bcryptEncoder;
        this.adminMapper = adminMapper;
        this.registeredUserService = registeredUserService;
    }

    @Override
    public List<AdminDto> findAllAdmins() {
        logger.debug("Fetching all admins");
        List<Admin> adminEntities = adminRepository.findAll();

        return adminEntities.stream().map(adminMapper::entityToDto).collect(Collectors.toList());
    }

    @Override
    public AdminDto saveAdmin(AdminDto adminDto) throws ExistingException {
        logger.debug("Saving admin {}", adminDto);

        Optional<Admin> adminOptional = adminRepository.findByEmail(adminDto.email);
        if (adminOptional.isPresent() ||
            registeredUserRepository.findRegisteredUserByEmail(adminDto.email).isPresent()) {
            throw new ExistingException("Admin exists with email: " + adminDto);
        } else {
            Admin admin = adminMapper.dtoToEntity(adminDto);
            admin.setPassword(bcryptEncoder.encode(adminDto.password));
            Admin persistedAdmin = adminRepository.save(admin);

            RegisteredUserDto registeredUser = new RegisteredUserDto();
            registeredUser.email = persistedAdmin.getEmail();
            registeredUser.password = persistedAdmin.getPassword();
            registeredUser.type = "admin";
            registeredUser.actualId = persistedAdmin.getId();

            registeredUserService.saveRegisteredUser(registeredUser);

            return adminMapper.entityToDto(persistedAdmin);
        }
    }
}
