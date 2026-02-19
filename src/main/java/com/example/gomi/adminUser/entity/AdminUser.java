package com.example.gomi.adminUser.entity;

import com.example.gomi.adminUser.constent.Role;
import com.example.gomi.adminUser.dto.JoinAdminUserDto;
import com.example.gomi.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Entity
@Getter
@ToString
@Table(name = "admin_users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AdminUser extends BaseEntity {

    @Id
    @Column(name = "admin_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 255, nullable = false)
    private String email;

    @Column(length = 255, nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false)
    private boolean isActive;

    private LocalDateTime lastLoginAt;

    @Column(length = 100, nullable = false)
    private String displayName;

    public static AdminUser createAdminUser(JoinAdminUserDto joinAdminUserDto, PasswordEncoder passwordEncoder){

        AdminUser adminUser = new AdminUser();
        adminUser.email = joinAdminUserDto.getEmail();
        adminUser.password = passwordEncoder.encode(joinAdminUserDto.getPassword());
        adminUser.role = Role.ADMIN;
        adminUser.isActive = true;
        adminUser.displayName = joinAdminUserDto.getDisplayName();

        return adminUser;

    }



}
