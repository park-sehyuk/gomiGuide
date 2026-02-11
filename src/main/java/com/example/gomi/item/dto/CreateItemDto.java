package com.example.gomi.item.dto;

import com.example.gomi.item.constent.Language;
import com.example.gomi.item.entity.ItemSynonym;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
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
    private List<ItemSynonym> synonyms;

    public CreateItemDto(String nameKo, String nameJp, Long categoryId, String description, String officialUrl, Boolean active, List<ItemSynonym> synonyms){
        this.nameKo = nameKo;
        this.nameJp = nameJp;
        this.categoryId = categoryId;
        this.description = description;
        this.officialUrl = officialUrl;
        this.active = active;
        this.synonyms = synonyms;
    }

    @Getter
    @Setter
    public static class Synonym{
        @NotBlank
        @Size(max = 150)
        private String keyword;

        @NotNull
        private Language lang;

        public Synonym(String keyword, Language lang){
            this.keyword = keyword;
            this.lang = lang;
        }
    }

    public enum Language{
        KO, JP, ETC
    }
}
