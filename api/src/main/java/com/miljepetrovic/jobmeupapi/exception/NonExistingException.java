package com.miljepetrovic.jobmeupapi.exception;

public class NonExistingException extends BusinessException {
    private int id;

    public NonExistingException(int id) {
        this.id = id;
    }

    public NonExistingException(String message) {
        super(message);
    }

    public NonExistingException(String message, int id) {
        super(message);
        this.id = id;
    }

    public int getId() {
        return id;
    }
}
