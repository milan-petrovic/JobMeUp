package com.miljepetrovic.jobmeupapi.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "registered_users")
public class RegisteredUser {
    private int id;
    private String email;
    private String password;
    private String type;
    private int actualId;

    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "registered_user_id", nullable = false, unique = true)
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

    @Column(name = "type", nullable = false, unique = true)
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Column(name = "id", nullable = false, unique = true)
    public int getActualId() {
        return actualId;
    }

    public void setActualId(int actualId) {
        this.actualId = actualId;
    }
}
