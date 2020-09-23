package com.miljepetrovic.jobmeupapi.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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
    private List<Skill> skills;
    private List<Benefit> benefits;
    private List<Project> projects;
    private List<Education> educations;
    private List<Employment> employments;
    private List<Vote> receivedVotes;
    private List<Vote> givenVotes;

    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @ManyToMany
    @JoinTable(name = "employees_skills", joinColumns = @JoinColumn(name = "employee_id"), inverseJoinColumns = @JoinColumn(name = "skill_id"))
    public List<Skill> getSkills() {
        return skills;
    }

    public void setSkills(List<Skill> skills) {
        this.skills = skills;
    }

    @ManyToMany
    @JoinTable(name = "employee_benefits", joinColumns = @JoinColumn(name = "employee_id"), inverseJoinColumns = @JoinColumn(name = "benefit_id"))
    public List<Benefit> getBenefits() {
        return benefits;
    }

    public void setBenefits(List<Benefit> benefits) {
        this.benefits = benefits;
    }

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    public List<Education> getEducations() {
        return educations;
    }

    public void setEducations(List<Education> educations) {
        this.educations = educations;
    }

    @OneToMany(mappedBy = "employee",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    public List<Employment> getEmployments() {
        return employments;
    }

    public void setEmployments(List<Employment> employments) {
        this.employments = employments;
    }

    @OneToMany(mappedBy = "receivedEmployee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    public List<Vote> getReceivedVotes() {
        return receivedVotes;
    }

    public void setReceivedVotes(List<Vote> receivedVotes) {
        this.receivedVotes = receivedVotes;
    }

    @OneToMany(mappedBy = "givenEmployee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    public List<Vote> getGivenVotes() {
        return givenVotes;
    }

    public void setGivenVotes(List<Vote> givenVotes) {
        this.givenVotes = givenVotes;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", about='" + about + '\'' +
                ", category=" + category +
                ", expectedSalary='" + expectedSalary + '\'' +
                ", skills=" + skills +
                ", benefits=" + benefits +
                ", projects=" + projects +
                ", educations=" + educations +
                ", employments=" + employments +
                '}';
    }
}
