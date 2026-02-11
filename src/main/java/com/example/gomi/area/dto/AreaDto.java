package com.example.gomi.area.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AreaDto {

    private String areaId;

    private String nameKo;

    private String nameJp;

    private String parentId;

    private boolean active;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public AreaDto(String areaId, String nameKo, String nameJp, String parentId, boolean active, LocalDateTime createdAt, LocalDateTime updatedAt){
        this.areaId = areaId;
        this.nameKo = nameKo;
        this.nameJp = nameJp;
        this.parentId = parentId;
        this.active = active;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}
