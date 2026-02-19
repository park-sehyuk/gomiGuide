package com.example.gomi.area.controller;

import com.example.gomi.area.dto.AreaRuleDto;
import com.example.gomi.area.service.AreaRuleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/areaRule")
public class AreaRuleController {

    private final AreaRuleService areaRuleService;

    @GetMapping("/{areaId}")
    public ResponseEntity<List<AreaRuleDto>> getDayOfWeek(@PathVariable String areaId){
        List<AreaRuleDto> dto = areaRuleService.getDayOfWeek(areaId);
        return ResponseEntity.ok(dto);
    }



}
