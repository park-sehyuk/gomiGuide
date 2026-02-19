package com.example.gomi.area.dto;

import com.example.gomi.area.entity.Areas;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AreaDto {

    private String areaId;

    private String nameKo;

    private String nameJp;

    private String parentId;

    private boolean active;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public static AreaDto selectedArea(Areas areas){
        AreaDto dto = new AreaDto();
        dto.areaId = areas.getId();
        dto.nameKo = areas.getNameKo();;
        dto.nameJp = areas.getNameJp();
        dto.parentId = areas.getParentId();
        dto.active = areas.isActive();

        return dto;
    }

}
