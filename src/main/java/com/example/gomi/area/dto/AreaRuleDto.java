package com.example.gomi.area.dto;

import com.example.gomi.area.constent.DayOfWeek;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
public class AreaRuleDto {
    private Long ruleId;
    private String areaId;
    private String areaNameKo;
    private Long categoryId;
    private String categoryCode;
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

    public AreaRuleDto(Long ruleId, String areaId, String areaNameKo, Long categoryId, String categoryCode, DayOfWeek dayOfWeek,
                       LocalTime timeStart, LocalTime timeEnd, String note, String sourceUrl, LocalDate effectiveFrom, LocalDate effectiveTo,
                       boolean active, LocalDateTime createdAt, LocalDateTime updatedAt){

        this.ruleId = ruleId;
        this.areaId = areaId;
        this.areaNameKo = areaNameKo;
        this.categoryId = categoryId;
        this.categoryCode = categoryCode;
        this.dayOfWeek = dayOfWeek;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.note = note;
        this.sourceUrl = sourceUrl;
        this.effectiveFrom = effectiveFrom;
        this.effectiveTo = effectiveTo;
        this.active = active;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;

    }

}
