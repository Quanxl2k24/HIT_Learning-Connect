package org.example.hitlearningconnectver1.security;

import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.example.hitlearningconnectver1.constants.SecurityPath;
import org.example.hitlearningconnectver1.security.customeUserDetails.CustomUserDetailsService;
import org.example.hitlearningconnectver1.security.jwt.JwtAuthenticationFilter;
import org.example.hitlearningconnectver1.security.jwt.RestAuthenticationEntryPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SecurityConfig implements WebMvcConfigurer {
    @Autowired
    JwtAuthenticationFilter jwtAuthenticationFilter;
    @Autowired
    CustomUserDetailsService uds;
//    @Autowired
//    OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
//    @Autowired
//    OAuth2LoginFailureHandler oAuth2LoginFailureHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, RestAuthenticationEntryPoint restAuthenticationEntryPoint) throws Exception {
        http
                .headers(
                        headers -> headers
                                .frameOptions(HeadersConfigurer.FrameOptionsConfig::deny)
                                .contentSecurityPolicy(contentSecurityPolicyConfig ->
                                        contentSecurityPolicyConfig.policyDirectives("form-action 'self'")
                                )
                )
                .authenticationProvider(daoAuthProvider())
                .cors(Customizer.withDefaults())
                .csrf(
                        csrf -> csrf.disable()
                )

                .exceptionHandling(
                        ex -> ex.authenticationEntryPoint(restAuthenticationEntryPoint)
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, SecurityPath.Anonymous).anonymous()
//                        .requestMatchers("/ws-chat/**").permitAll()
                        .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**", "/login", "/swagger-ui/index.html").permitAll()
                        .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/v1/user/**").hasRole("USER")
                        .requestMatchers("/login/oauth2/**").permitAll()
                        .anyRequest().authenticated()
                )
//                .oauth2Login(oauth2 -> oauth2
//                        .successHandler(oAuth2LoginSuccessHandler)
//                        .failureHandler(oAuth2LoginFailureHandler)
//                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @Bean
    public DaoAuthenticationProvider daoAuthProvider() {
        var daoAuthProvider = new DaoAuthenticationProvider();
        daoAuthProvider.setUserDetailsService(uds);
        daoAuthProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter, CustomUserDetailsService uds) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.uds = uds;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration
    ) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
