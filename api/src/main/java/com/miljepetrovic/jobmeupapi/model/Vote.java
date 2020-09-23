package com.miljepetrovic.jobmeupapi.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "votes")
public class Vote {
    private int id;
    private Employee receivedEmployee;
    private Employee givenEmployee;

    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vote_id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @ManyToOne()
    @JoinColumn(name = "received_employee")
    public Employee getReceivedEmployee() {
        return receivedEmployee;
    }

    public void setReceivedEmployee(Employee receivedEmployee) {
        this.receivedEmployee = receivedEmployee;
    }

    @ManyToOne()
    @JoinColumn(name = "given_employee")
    public Employee getGivenEmployee() {
        return givenEmployee;
    }

    public void setGivenEmployee(Employee givenEmployee) {
        this.givenEmployee = givenEmployee;
    }
}
