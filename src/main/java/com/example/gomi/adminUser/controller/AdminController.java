package com.example.gomi.adminUser.controller;

import com.example.gomi.adminUser.dto.JoinAdminUserDto;
import com.example.gomi.adminUser.dto.LoginAdminUserDto;
import com.example.gomi.adminUser.service.AdminUserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminUserService adminUserService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/join")
    public ResponseEntity<Long> join(@RequestBody @Valid JoinAdminUserDto dto){
        Long adminId = adminUserService.joinAdmin(dto);

        return ResponseEntity.ok(adminId);
    }

    @GetMapping("/check")
    public ResponseEntity<Map<String, Object>> adminCheck(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()
                || "anonymousUser".equals(authentication.getPrincipal())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("authenticated", false, "role", null));
        }

        List<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        return ResponseEntity.ok(Map.of(
                "authenticated", true,
                "role", roles
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(
            @RequestBody LoginAdminUserDto request,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse
    ){
        Authentication auth;
        try {
            auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "아이디/비밀번호가 올바르지 않습니다."));
        }

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(auth);
        SecurityContextHolder.setContext(context);

        httpRequest.getSession(true);
        new HttpSessionSecurityContextRepository()
                .saveContext(context, httpRequest, httpResponse);

        List<String> roles = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        return ResponseEntity.ok(Map.of(
                "authenticated", true,
                "role", roles
        ));
    }

}
