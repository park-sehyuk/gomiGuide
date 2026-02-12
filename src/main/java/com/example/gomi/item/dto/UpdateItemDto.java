package com.example.gomi.item.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class UpdateItemDto {

    @NotBlank
    @Size(max = 150)
    private String nameKo;

    @NotBlank
    @Size(max = 150)
    private String nameJp;

    @NotNull
    private Long categoryId;

    private String description;

    @Size(max = 500)
    private String officialUrl;

    private Boolean active;

    @Valid
    private List<CreateItemDto.Synonym> synonyms;

    public UpdateItemDto(String nameKo, String nameJp, Long categoryId, String description, String officialUrl, Boolean active, List<CreateItemDto.Synonym> synonyms){
        this.nameKo = nameKo;
        this.nameJp = nameJp;
        this.categoryId = categoryId;
        this.description = description;
        this.officialUrl = officialUrl;
        this.active = active;
        this.synonyms = synonyms;
    }

}
