package com.example.gomi.item.dto;

import com.example.gomi.item.constent.Language;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateItemDto {

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


    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Synonym extends CreateItemDto {
        @NotBlank
        @Size(max = 150)
        private String keyword;

        @NotNull
        private Language lang;
    }
}
