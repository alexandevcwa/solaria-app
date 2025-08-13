package com.solaria.app.controller;

import com.solaria.app.dto.ProfesionDto;
import com.solaria.app.dto.ResponseDto;
import com.solaria.app.service.ProfesionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/profesiones")
@RequiredArgsConstructor
public class ProfesionController {

    private final ProfesionService profesionService;

    @PostMapping
    public ResponseEntity<ResponseDto> postProfesion(@RequestBody @Valid ProfesionDto profesionDto) {
        ProfesionDto dto = profesionService.save(profesionDto);

        ResponseDto response = ResponseDto.builder()
                .code(201)
                .title("Profesión creada")
                .phrase("Created")
                .message("Profesión creada con éxito")
                .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


}
