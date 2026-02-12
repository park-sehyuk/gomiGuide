package com.example.gomi.category.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UpdateCategoryDto {

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

    public UpdateCategoryDto(String nameKo, String nameJp, Integer sortOrder, String colorToken, String iconUrl, Boolean active){
        this.nameKo = nameKo;
        this.nameJp = nameJp;
        this.sortOrder = sortOrder;
        this.colorToken = colorToken;
        this.iconUrl = iconUrl;
        this.active = active;
    }

}
