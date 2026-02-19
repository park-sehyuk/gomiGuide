package com.example.gomi.config.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    // 인증이 필요한 리소스에 접근할 떄 호출되며
    // 예외가 발생하면 실행됨
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        String uri = request.getRequestURI();
        String accept = request.getHeader("Accept");
        boolean wantsHtml = accept != null && accept.contains("text/html");

        if (uri != null && uri.startsWith("/admin") && wantsHtml) {
            response.sendRedirect("/admin/login");
            return;
        }

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write("{\"message\" : \"로그인이 필요한 서비스입니다.\"}");
    }

}
