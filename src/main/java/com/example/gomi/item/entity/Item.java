package com.example.gomi.item.entity;

import com.example.gomi.category.entity.Categories;
import com.example.gomi.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "items")
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Item extends BaseEntity {

    @Id
    @Column(name = "item_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 150, nullable = false)
    private String nameKo;

    @Column(length = 150, nullable = false)
    private String nameJp;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Categories categories;

    @Lob
    private String description;

    @Column(length = 500)
    private String officialUrl;

    @Column(name = "is_active", nullable = false)
    private boolean active = true;


    public static Item item(String nameKo, String nameJp, Categories categories,
                            String description, String officialUrl, boolean active ){

        Item item = new Item();
        item.nameKo = nameKo;
        item.nameJp = nameJp;
        item.categories = categories;
        item.description = description;
        item.officialUrl = officialUrl;
        item.active = active;

        return item;
    }

    public static Item of(String nameKo, String nameJp, String description, Categories category) {
        Item item = new Item();
        item.nameKo = nameKo;
        item.nameJp = nameJp;
        item.description = description;
        item.categories = category;

        return item;
    }

    public void reName(String nameKo, String nameJp){
        this.nameKo = nameKo;
        this.nameJp = nameJp;
    }

    public void changeCategory(Categories categories){
        this.categories = categories;
    }

    public void changeDescription(String description){
        this.description = description;
    }

    public void changeContent(String description, String officialUrl){
        this.description = description;
        this.officialUrl = officialUrl;
    }

    public void changeActive(boolean active){
        this.active = active;
    }

}
