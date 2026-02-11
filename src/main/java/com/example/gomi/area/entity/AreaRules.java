package com.example.gomi.area.entity;

import com.example.gomi.area.constent.DayOfWeek;
import com.example.gomi.category.entity.Categories;
import com.example.gomi.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Getter
@ToString
@Table(name = "area_rules")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AreaRules extends BaseEntity {

    @Id
    @Column(name = "rule_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "area_id", nullable = false)
    private Areas areas;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Categories categories;

    @Enumerated(EnumType.STRING)
    @Column(length = 10, nullable = false)
    private DayOfWeek dayOfWeek;

    private LocalTime timeStart;

    private LocalTime timeEnd;

    @Column(length = 500)
    private String note;

    @Column(length = 500)
    private String sourceUrl;

    private LocalDate effectiveFrom;

    private LocalDate effectiveTo;

    @Column(name = "is_active",nullable = false)
    private boolean active = true;

    public static AreaRules areaRules(Areas areas, Categories categories, DayOfWeek dayOfWeek, LocalTime timeStart, LocalTime timeEnd, String note, String sourceUrl, LocalDate effectiveFrom, LocalDate effectiveTo, boolean active){
        AreaRules areaRules = new AreaRules();
        areaRules.areas = areas;
        areaRules.categories =categories;
        areaRules.dayOfWeek = dayOfWeek;
        areaRules.timeStart = timeStart;
        areaRules.timeEnd = timeEnd;
        areaRules.note = note;
        areaRules.sourceUrl = sourceUrl;
        areaRules.effectiveFrom = effectiveFrom;
        areaRules.effectiveTo = effectiveTo;
        areaRules.active = active;

        return areaRules;
    }

    public void changeTime(LocalTime start, LocalTime end) {
        this.timeStart = start;
        this.timeEnd = end;
    }

    public void changeNote(String note) {
        this.note = note;
    }

    public void changeSourceUrl(String sourceUrl) {
        this.sourceUrl = sourceUrl;
    }

    public void changeEffectivePeriod(LocalDate from, LocalDate to) {
        this.effectiveFrom = from;
        this.effectiveTo = to;
    }

    public void changeActive(boolean active) {
        this.active = active;
    }

}
