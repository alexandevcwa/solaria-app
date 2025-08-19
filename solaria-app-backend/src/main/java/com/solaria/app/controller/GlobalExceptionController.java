package com.solaria.app.controller;

import com.solaria.app.dto.ResponseDto;
import com.solaria.app.exception.ServiceException;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionController {

    @ExceptionHandler(ServiceException.class)
    public ResponseEntity<ResponseDto> handleServiceException(ServiceException ex) {
        return ResponseEntity.status(ex.getHttpStatus().value())
                .body(ResponseDto.builder()
                        .code(ex.getHttpStatus().value())
                        .phrase(ex.getHttpStatus().getReasonPhrase())
                        .timestamp(LocalDateTime.now())
                        .message(ex.getMessage())
                        .build());
    }
}
