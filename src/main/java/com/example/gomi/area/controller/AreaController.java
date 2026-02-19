package com.example.gomi.area.controller;

import com.example.gomi.area.dto.AreaDto;
import com.example.gomi.area.service.AreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/area")
public class AreaController {

    @Autowired
    private AreaService areaService;

    @GetMapping
    public ResponseEntity<List<AreaDto>> getArea(){
        List<AreaDto> dto = areaService.getAreas();

        return ResponseEntity.ok(dto);
    }

}
