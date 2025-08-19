package com.solaria.app.controller;

import com.solaria.app.dto.ProfesionDto;
import com.solaria.app.dto.ResponseDto;
import com.solaria.app.service.ProfesionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "${frontend.origin}")
@RestController
@RequestMapping("/profesiones")
@RequiredArgsConstructor
@Tag(name = "Profesiones", description = "Operaciones relacionadas con profesiones")
public class ProfesionController {

    private final ProfesionService profesionService;

    @PostMapping
    @Operation(summary = "Crear una nueva profesión")
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

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar una profesión existente")
    public ResponseEntity<ResponseDto> putProfesion(@PathVariable("id") Integer id, @RequestBody @Valid ProfesionDto profesionDto) {
        ProfesionDto dto = profesionService.update(id, profesionDto);

        ResponseDto response = ResponseDto.builder()
                .code(200)
                .title("Profesión actualizada")
                .phrase("OK")
                .message("Profesión actualizada con éxito")
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    @PatchMapping("/{id}/estado")
    @Operation(summary = "Actualizar el estado de una profesión")
    public ResponseEntity<ResponseDto> putProfesionEstado(@PathVariable("id") Integer id,
                                                          @RequestParam("estado") Boolean estado) {
        profesionService.changeStatus(id, estado);
        ResponseDto response = ResponseDto.builder()
                .code(200)
                .title("Estado de profesión actualizado")
                .phrase("OK")
                .message("Estado de profesión actualizado con éxito")
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping
    @Operation(summary = "Obtener todas las profesiones")
    public ResponseEntity<Iterable<ProfesionDto>> getAllProfesiones(@RequestParam(value = "estado", required = false) Boolean estado){

        if (null == estado) {
            return ResponseEntity.ok(profesionService.findAll());
        }

        return ResponseEntity.ok(profesionService.getAllByStatus(estado));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener una profesión por ID")
    public ResponseEntity<ProfesionDto> getById(@PathVariable("id")Integer id){
        return ResponseEntity.ok(profesionService.findById(id));
    }

}
