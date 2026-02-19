package com.example.gomi.admin.dashboard.controller;

import com.example.gomi.admin.dashboard.dto.AdminDashboardDto;
import com.example.gomi.admin.dashboard.service.AdminDashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {

    private final AdminDashboardService adminDashboardService;

    public AdminDashboardController(AdminDashboardService adminDashboardService) {
        this.adminDashboardService = adminDashboardService;
    }

    @GetMapping
    public ResponseEntity<AdminDashboardDto> getDashboard() {
        return ResponseEntity.ok(adminDashboardService.getDashboard());
    }
}
