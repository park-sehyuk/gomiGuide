package com.example.gomi.category.entity;

import com.example.gomi.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@ToString
@Table(name = "categories", uniqueConstraints = {
        @UniqueConstraint(name = "uk_categories_code", columnNames = "code")
})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Categories extends BaseEntity {

    @Id
    @Column(name = "category_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 30, nullable = false)
    private String code;

    @Column(length = 100, nullable = false)
    private String categoryNameKo;

    @Column(length = 100, nullable = false)
    private String categoryNameJp;

    @Column(nullable = false)
    private int sortOrder = 0;

    @Column(length = 30)
    private String colorToken;

    @Column(length = 50)
    private String iconUrl;

    @Column(name = "is_active", nullable = false)
    private boolean active = true;

    public static Categories category(String code, String categoryNameKo, String categoryNameJp, int sortOrder, String colorToken, String iconUrl ,boolean active){
        Categories categories = new Categories();
        categories.code = code;
        categories.categoryNameKo = categoryNameKo;
        categories.categoryNameJp = categoryNameJp;
        categories.sortOrder = sortOrder;
        categories.colorToken = colorToken;
        categories.iconUrl = iconUrl;
        categories.active = active;

        return categories;
    }

    public void rename(String categoryNameKo, String categoryNameJp) {
        this.categoryNameKo = categoryNameKo;
        this.categoryNameJp = categoryNameJp;
    }

    public void changeUiToken(String colorToken, String iconUrl) {
        this.colorToken = colorToken;
        this.iconUrl = iconUrl;
    }

    public void changeActive(boolean active) {
        this.active = active;
    }

}

