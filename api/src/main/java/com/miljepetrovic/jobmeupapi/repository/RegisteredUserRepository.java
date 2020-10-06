package com.miljepetrovic.jobmeupapi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.miljepetrovic.jobmeupapi.model.RegisteredUser;

@Repository
public interface RegisteredUserRepository extends JpaRepository<RegisteredUser, Integer> {
    Optional<RegisteredUser> findRegisteredUserByEmail(String email);
}
