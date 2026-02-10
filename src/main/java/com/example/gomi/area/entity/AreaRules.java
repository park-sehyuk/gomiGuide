package com.example.gomi.area.entity;

import com.example.gomi.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@ToString
@Table(name = "area_rules")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AreaRules extends BaseEntity {

    @Id
    @Column(name = "rule_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



}
