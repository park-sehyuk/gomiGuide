package com.example.gomi.area.service;

import com.example.gomi.area.dto.AreaDto;
import com.example.gomi.area.entity.Areas;
import com.example.gomi.area.repository.AreasRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.geom.Area;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AreaServiceImpl implements AreaService{

    private final AreasRepository areasRepository;

    @Override
    public List<AreaDto> getAreas() {
        List<Areas> areas;
        areas = areasRepository.findAllByActiveTrue();

        return areas.stream().map(AreaDto::selectedArea).collect(Collectors.toList());
    }
}
