package com.example.gomi.area.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateAreaDto {

    @NotBlank
    @Size(max = 50)
    private String areaId;

    @NotBlank
    @Size(max = 100)
    private String nameKo;

    @NotBlank
    @Size(max = 100)
    private String nameJp;

    @Size(max = 50)
    private String parentId;

    private Boolean active;

    public CreateAreaDto(String areaId, String nameKo, String nameJp, String parentId, Boolean active){
        this.areaId = areaId;
        this.nameKo = nameKo;
        this.nameJp = nameJp;
        this.parentId = parentId;
        this.active = active;
    }


}
