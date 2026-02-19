package com.example.gomi.admin.area.service;

import com.example.gomi.admin.area.dto.AdminAreaDto;

import java.util.List;

public interface AdminAreaService {
    List<AdminAreaDto> getAreas();
    AdminAreaDto create(AdminAreaDto dto);
    AdminAreaDto update(String areaId, AdminAreaDto dto);
    void delete(String areaId);
}
