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
@Table(name = "areas")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Areas extends BaseEntity {

    @Id
    @Column(name = "area_id", length = 50, nullable = false)
    private String id;

    @Column(length = 100, nullable = false)
    private String nameKo;

    @Column(length = 100, nullable = false)
    private String nameJp;

    @Column(length = 60)
    private String parentId;

    @Column(name = "is_active", nullable = false)
    private boolean active = true;

    public static Areas createAreas(String id, String nameKo, String nameJp, String parentId, boolean active){
        Areas areas = new Areas();
        areas.id = id;
        areas.nameKo = nameKo;
        areas.nameJp = nameJp;
        areas.parentId = parentId;
        areas.active = active;

        return areas;
    }

    public void reName(String nameKo, String nameJp){
        this.nameKo = nameKo;
        this.nameJp = nameJp;
    }

    public void changeActive(boolean active){
        this.active = active;
    }

    public void changeParent(String parentId){
        this.parentId = parentId;
    }
}
