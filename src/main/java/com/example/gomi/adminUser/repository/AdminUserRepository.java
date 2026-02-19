package com.example.gomi.adminUser.repository;

import com.example.gomi.adminUser.entity.AdminUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminUserRepository extends JpaRepository<AdminUser, Long> {

    boolean existsByEmail(String email);

    Optional<AdminUser> findByEmail(String email);
}
