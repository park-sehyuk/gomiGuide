package com.example.gomi.adminUser.service;

import com.example.gomi.adminUser.dto.JoinAdminUserDto;
import com.example.gomi.adminUser.entity.AdminUser;
import com.example.gomi.adminUser.repository.AdminUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminUserServiceImpl implements AdminUserService {

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Long joinAdmin(JoinAdminUserDto dto) {
        checkMember(dto);
        AdminUser admin = AdminUser.createAdminUser(dto, passwordEncoder);
        adminUserRepository.save(admin);

        return admin.getId();
    }

    public void checkMember(JoinAdminUserDto dto){
        if(adminUserRepository.existsByEmail(dto.getEmail()))
            // IllegalStateException : 메서드 호출 시 객체의 상태가 등록할 수 없는 경우에 발생
            throw new IllegalStateException("이미 사용중인 아이디입니다.");

        if(adminUserRepository.existsByEmail(dto.getEmail()))
            // IllegalStateException : 메서드 호출 시 객체의 상태가 등록할 수 없는 경우에 발생
            throw new IllegalStateException("이미 사용중인 이메일입니다.");

    }
}
