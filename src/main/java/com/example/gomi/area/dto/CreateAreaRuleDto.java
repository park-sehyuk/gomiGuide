package com.example.gomi.area.dto;

import com.example.gomi.area.constent.DayOfWeek;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class CreateAreaRuleDto {

    @NotBlank
    private String areaId;

    @NotNull
    private Long categoryId;

    @NotNull
    private DayOfWeek dayOfWeek;

    private LocalTime timeStart;

    private LocalTime timeEnd;

    @Size(max = 500)
    private String note;
    @Size(max = 500)
    private String sourceUrl;

    private LocalDate effectiveFrom;

    private LocalDate effectiveTo;

    private Boolean active;

    public CreateAreaRuleDto(String areaId, Long categoryId, DayOfWeek dayOfWeek, LocalTime timeStart, LocalTime timeEnd, String note, String sourceUrl, LocalDate effectiveFrom, LocalDate effectiveTo, Boolean active){
        this.areaId = areaId;
        this.categoryId = categoryId;
        this.dayOfWeek = dayOfWeek;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.note = note;
        this.sourceUrl = sourceUrl;
        this.effectiveFrom = effectiveFrom;
        this.effectiveTo = effectiveTo;
        this.active = active;
    }
}
