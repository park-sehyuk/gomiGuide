package com.example.gomi.adminUser.service;

import com.example.gomi.adminUser.entity.AdminUser;
import com.example.gomi.adminUser.repository.AdminUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AdminUserSecurityServiceImpl implements UserDetailsService {

    @Autowired
    private AdminUserRepository adminUserRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        AdminUser admin = adminUserRepository.findByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException("사용자를 찾을 수 없습니다.")
        );

        return User.builder()
                .username(admin.getEmail())
                .password(admin.getPassword())
                .roles(admin.getRole().toString())
                .build();
    }
}
