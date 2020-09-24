package com.miljepetrovic.jobmeupapi.exception;

public class ExistingException extends BusinessException {
    private int id;

    public ExistingException(int id) {
        this.id = id;
    }

    public ExistingException(String message) {
        super(message);
    }

    public int getId() {
        return id;
    }
}
