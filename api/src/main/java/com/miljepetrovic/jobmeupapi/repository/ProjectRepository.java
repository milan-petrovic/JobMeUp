package com.miljepetrovic.jobmeupapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.miljepetrovic.jobmeupapi.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
}
