package com.solaria.app.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDto {
    private Integer code;
    private String title;
    private String phrase;
    private String message;
    private LocalDateTime timestamp;
    private String resource;
}
