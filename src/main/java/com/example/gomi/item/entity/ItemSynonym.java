package com.example.gomi.item.entity;

import com.example.gomi.entity.BaseEntity;
import com.example.gomi.item.constent.Language;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@ToString
@Table(name = "item_synonyms")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ItemSynonym extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "synonym_id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @Column(length = 150, nullable = false)
    private String keyword;

    @Enumerated(EnumType.STRING)
    @Column(length = 10, nullable = false)
    private Language lang = Language.KO;


}
