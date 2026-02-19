package com.example.gomi.area.service;

import com.example.gomi.area.dto.AreaRuleDto;

import java.util.List;

public interface AreaRuleService {

    List<AreaRuleDto> getDayOfWeek(String areaId);

    List<AreaRuleDto> getAreaCategory(String areaId, Long categoryId);

}
