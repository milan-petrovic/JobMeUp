package com.miljepetrovic.jobmeupapi.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miljepetrovic.jobmeupapi.dto.admin.AdminDto;
import com.miljepetrovic.jobmeupapi.dto.authentication.JwtRequestDto;
import com.miljepetrovic.jobmeupapi.dto.authentication.JwtResponseDto;
import com.miljepetrovic.jobmeupapi.dto.company.CompanyDto;
import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeDto;
import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeRequestDto;
import com.miljepetrovic.jobmeupapi.service.jwtuserdetailsservice.JwtUserDetailsService;
import com.miljepetrovic.jobmeupapi.utils.JwtTokenUtil;

@RestController
@RequestMapping("/authenticate")
public class JwtAuthenticationController {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final JwtUserDetailsService userDetailsService;

    @Autowired
    public JwtAuthenticationController(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, JwtUserDetailsService userDetailsService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping(value = "/employee")
    public ResponseEntity<?> createAuthenticationTokenEmployee(@RequestBody JwtRequestDto authenticationRequest) throws Exception {
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        UserDetails userDetails = null;
        final EmployeeDto employeeDto = userDetailsService.loadEmployeeByEmail(authenticationRequest.getUsername());

        if (employeeDto != null) {
             userDetails = userDetailsService
                    .loadUserByUsername(authenticationRequest.getUsername());
        }
        final String token = jwtTokenUtil.generateTokenForEmployee(employeeDto, userDetails);
        return ResponseEntity.ok(new JwtResponseDto(token));
    }

    @PostMapping(value = "/company")
    public ResponseEntity<?> createAuthenticationTokenCompany(@RequestBody JwtRequestDto authenticationRequest) throws Exception {
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        UserDetails userDetails = null;
        final CompanyDto companyDto = userDetailsService.loadCompanyByEmail(authenticationRequest.getUsername());

        if (companyDto != null) {
            userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        }
        final String token = jwtTokenUtil.generateTokenForCompany(companyDto, userDetails);
        return ResponseEntity.ok(new JwtResponseDto(token));
    }

    @PostMapping(value = "/admin")
    public ResponseEntity<?> createAuthenticationTokenAdmin(@RequestBody JwtRequestDto authenticationRequest) throws Exception {
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        UserDetails userDetails = null;
        AdminDto adminDto = userDetailsService.loadAdminByEmail(authenticationRequest.getUsername());

        if (adminDto != null) {
            userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        }
        final String token = jwtTokenUtil.generateTokenForAdmin(adminDto, userDetails);
        return ResponseEntity.ok(new JwtResponseDto(token));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}