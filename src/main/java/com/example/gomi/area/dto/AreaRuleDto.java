package com.example.gomi.area.dto;

import com.example.gomi.area.constent.DayOfWeek;
import com.example.gomi.area.entity.AreaRules;
import com.example.gomi.area.entity.Areas;
import com.example.gomi.category.entity.Categories;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AreaRuleDto {
    private Long ruleId;
    private String areaId;
    private String areaNameKo;
    private Long categoryId;
    private String categoryCode;
    private String iconUrl;
    private String categoryNameKo;
    private DayOfWeek dayOfWeek;
    private LocalTime timeStart;
    private LocalTime timeEnd;
    private String note;
    private String sourceUrl;
    private LocalDate effectiveFrom;
    private LocalDate effectiveTo;
    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    public static AreaRuleDto from(AreaRules areaRules){
        AreaRuleDto dto = new AreaRuleDto();
        dto.ruleId = areaRules.getId();
        dto.dayOfWeek = areaRules.getDayOfWeek();
        dto.timeStart = areaRules.getTimeStart();
        dto.timeEnd = areaRules.getTimeEnd();
        dto.note = areaRules.getNote();
        dto.sourceUrl = areaRules.getSourceUrl();
        dto.effectiveFrom = areaRules.getEffectiveFrom();
        dto.effectiveTo = areaRules.getEffectiveTo();
        dto.active = areaRules.isActive();

        Areas areas = areaRules.getAreas();
        if(areas != null){
            dto.areaId = areas.getId();
            dto.areaNameKo = areas.getNameKo();
        }

        Categories categories = areaRules.getCategories();
        if(categories != null){
            dto.categoryId = categories.getId();
            dto.categoryCode = categories.getCode();
            dto.iconUrl = categories.getIconUrl();
            dto.categoryNameKo = categories.getCategoryNameKo();
        }

        return dto;
    }

}
