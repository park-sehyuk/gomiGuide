package com.example.gomi.admin.area.controller;

import com.example.gomi.admin.area.dto.AdminAreaDto;
import com.example.gomi.admin.area.service.AdminAreaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/admin/areas")
public class AdminAreaController {

    private final AdminAreaService adminAreaService;

    public AdminAreaController(AdminAreaService adminAreaService) {
        this.adminAreaService = adminAreaService;
    }

    @GetMapping
    public ResponseEntity<List<AdminAreaDto>> getAreas() {
        return ResponseEntity.ok(adminAreaService.getAreas());
    }

    @PostMapping
    public ResponseEntity<AdminAreaDto> create(@RequestBody AdminAreaDto dto) {
        AdminAreaDto created = adminAreaService.create(dto);
        return ResponseEntity.created(URI.create("/api/admin/areas/" + created.getId()))
                .body(created);
    }

    @PatchMapping("/{areaId}")
    public ResponseEntity<AdminAreaDto> update(@PathVariable String areaId,
                                               @RequestBody AdminAreaDto dto) {
        return ResponseEntity.ok(adminAreaService.update(areaId, dto));
    }

    @DeleteMapping("/{areaId}")
    public ResponseEntity<Void> delete(@PathVariable String areaId) {
        adminAreaService.delete(areaId);
        return ResponseEntity.noContent().build();
    }
}
