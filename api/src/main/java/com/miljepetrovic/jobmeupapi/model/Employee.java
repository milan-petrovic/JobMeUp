package com.miljepetrovic.jobmeupapi.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "employees")
public class Employee {
    private int id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String about;
    private Category category;
    private String expectedSalary;

    @Id()
    @Column(name = "employee_id", nullable = false, unique = true)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Column(name = "email", nullable = false, unique = true)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Column(name = "password", nullable = false, unique = true)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Column(name = "first_name", nullable = false)
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Column(name = "last_name", nullable = false)
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Column(name = "about", nullable = false)
    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category", nullable = false)
    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    @Column(name = "expected_salary")
    public String getExpectedSalary() {
        return expectedSalary;
    }

    public void setExpectedSalary(String expectedSalary) {
        this.expectedSalary = expectedSalary;
    }
}
