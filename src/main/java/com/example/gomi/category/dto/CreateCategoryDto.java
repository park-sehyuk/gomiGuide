package com.example.gomi.category.dto;

import com.example.gomi.area.dto.CreateAreaDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCategoryDto {

    @NotBlank
    @Size(max = 30)
    private String code;

    @NotBlank
    @Size(max = 100)
    private String nameKo;

    @NotBlank
    @Size(max = 100)
    private String nameJp;

    @NotNull
    private Integer sortOrder;

    @Size(max = 30)
    private String colorToken;

    @Size(max = 50)
    private String iconUrl;

    private Boolean active;

    public CreateCategoryDto(String code, String nameKo, String nameJp, Integer sortOrder, String colorToken, String iconUrl, Boolean active){
        this.code = code;
        this.nameKo = nameKo;
        this.nameJp = nameJp;
        this.sortOrder = sortOrder;
        this.colorToken = colorToken;
        this.iconUrl = iconUrl;
        this.active = active;
    }

}
