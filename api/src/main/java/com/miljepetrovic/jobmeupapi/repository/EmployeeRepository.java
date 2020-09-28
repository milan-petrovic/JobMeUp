package com.miljepetrovic.jobmeupapi.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.miljepetrovic.jobmeupapi.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    List<Employee> findEmployeeByCategoryId(int categoryId);
    Optional<Employee> findEmployeeById(int employeeId);
}
