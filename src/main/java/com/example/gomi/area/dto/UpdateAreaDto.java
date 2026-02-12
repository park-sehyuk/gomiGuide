package com.example.gomi.area.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UpdateAreaDto {

    @NotBlank
    @Size(max = 100)
    private String nameKo;

    @NotBlank
    @Size(max = 100)
    private String nameJp;

    @Size(max = 50)
    private String parentId;

    private Boolean active;

    public UpdateAreaDto(String nameKo, String nameJp, String parentId, Boolean active){
        this.nameKo = nameKo;
        this.nameJp = nameJp;
        this.parentId = parentId;
        this.active = active;
    }

}
