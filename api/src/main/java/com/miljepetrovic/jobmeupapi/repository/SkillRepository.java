package com.miljepetrovic.jobmeupapi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.miljepetrovic.jobmeupapi.model.Skill;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Integer> {
    Optional<Skill> findByName(String name);
}
