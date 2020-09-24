package com.miljepetrovic.jobmeupapi.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

import com.miljepetrovic.jobmeupapi.exception.ApiError;
import com.miljepetrovic.jobmeupapi.exception.ExistingException;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;
import com.miljepetrovic.jobmeupapi.utils.Constants;

@ControllerAdvice
public class RestControllerAdvice {
    private static final Logger logger = LoggerFactory.getLogger(RestControllerAdvice.class);

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ApiError> handleResponseStatusException(ResponseStatusException ex) {
        ApiError apiError = new ApiError(ex.getStatus(), Constants.REQUEST_ERROR, ex.getReason());
        logger.warn(apiError.toString());
        return new ResponseEntity<>(apiError, new HttpHeaders(), apiError.getStatus());
    }

    @ExceptionHandler(NonExistingException.class)
    public ResponseEntity<ApiError> handleNonExistingException(NonExistingException e) {
        ApiError apiError = new ApiError(HttpStatus.NOT_FOUND, Constants.REQUEST_ERROR, e.getMessage());
        logger.warn(apiError.toString());
        return new ResponseEntity<>(apiError, new HttpHeaders(), apiError.getStatus());
    }

    @ExceptionHandler(ExistingException.class)
    public ResponseEntity<ApiError> handleExistingException(ExistingException e) {
        ApiError apiError = new ApiError(HttpStatus.CONFLICT, Constants.REQUEST_ERROR, e.getMessage());
        logger.warn(apiError.toString());
        return new ResponseEntity<>(apiError, new HttpHeaders(), apiError.getStatus());
    }
}
