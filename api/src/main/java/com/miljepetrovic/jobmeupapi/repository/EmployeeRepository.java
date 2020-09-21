package com.miljepetrovic.jobmeupapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.miljepetrovic.jobmeupapi.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}
