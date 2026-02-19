package com.example.gomi.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                //CSRF 보호 대상 : 타임리프 폼, JSP, 세션 기반 로그인..
                //템플릿 엔진을 사용하지 않으므로 비활성화
                .csrf(csrf -> csrf.disable())

                //CORS 설정
                //리액트와 부트의 포트번호가 다르므로 포트번호를 명시적으로 설정
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                //세션 관리 설정
                //IF_REQUIRED : 세션이나 쿠키가 필요할 때 세션을 생성하도록 함
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                )

                //권한 설정
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/icon/**", "/**/*.html").permitAll()
                        .requestMatchers("/api/login/**").permitAll()
                        .requestMatchers("/api/admin/login", "/api/admin/join").permitAll()
                        .requestMatchers("/api/admin/check").authenticated()
                        .requestMatchers("/api/admin/dashboard").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers("/api/admin/items/**").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers("/api/admin/areas/**").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers("/admin/login", "/admin/login/**").permitAll()
                        .requestMatchers("/admin/**").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers("/**").permitAll()
                        .anyRequest().authenticated()
                )

                .formLogin(formLogin -> formLogin
                        .loginPage("/admin/login")
                        .loginProcessingUrl("/user/login")
                        .defaultSuccessUrl("/", true)
                        .usernameParameter("id")
                        .passwordParameter("pw"))

                //로그아웃 처리
                .logout(logout -> logout
                        .logoutUrl("/admin/logout")
                        .logoutSuccessHandler((req, res, auth) -> {
                            //상태코드 200번(성공)만 전달
                            res.setStatus(200);
                        })
                )

                //화면을 리액트에서 처리할 예정이므로
                // 시큐리티의 기본 로그인 폼을 사용하지 않도록 설정
                .formLogin(form -> form.disable())

                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(new CustomAuthenticationEntryPoint()))
        ;

        return http.build();
    }

    //외부 포트 허용 설정
    //리액트에서 스프링으로 API를 전송할 때 차단을 방지
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        //3000번 포트에서 오는 요청만 신뢰하도록 지정
        config.setAllowedOrigins(List.of("http://localhost:3000"));
        //허용할 요청 방식
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        //모든 헤더 정보를 신뢰하도록 설정
        config.setAllowedHeaders(List.of("*"));
        //세션과 쿠키를 주고받기 위해 설정
        config.setAllowCredentials(true);

        //모든 요청에 대해서 CORS 정책을 허용하도록 함
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }

    //비밀번호 암호화
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    //formLogin을 사용할 때는 시큐리티가 인증을 자동을 설정하여 호출하는데
    //리액트에서 폼을 담당할 예정이라 formLogin().disalbe()로 설정하였으므로
    //자동로그인을 처리할 수 있도록 빈을 직접 등록함.
    @Bean
    public AuthenticationManager authenticationManager
    (AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
