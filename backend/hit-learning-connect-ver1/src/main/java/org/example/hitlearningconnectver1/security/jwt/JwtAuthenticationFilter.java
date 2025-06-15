package org.example.hitlearningconnectver1.security.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.hitlearningconnectver1.constants.TokenError;
import org.example.hitlearningconnectver1.exception.extended.JwtAuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    JwtTokenProvider tokenProvider;
    RestAuthenticationEntryPoint entryPoint;

    @Autowired
    public JwtAuthenticationFilter(RestAuthenticationEntryPoint entryPoint, JwtTokenProvider tokenProvider) {
        this.entryPoint = entryPoint;
        this.tokenProvider = tokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                tokenProvider.validateToken(token);
                Authentication auth = tokenProvider.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(auth);

            } catch (MalformedJwtException ex) {
                entryPoint.commence(request, response,
                        new JwtAuthenticationException(TokenError.Token.Malformed));
                return;
            } catch (io.jsonwebtoken.security.SignatureException ex) {
                entryPoint.commence(request, response,
                        new JwtAuthenticationException(TokenError.Token.Signature));
                return;
            } catch (ExpiredJwtException ex) {
                entryPoint.commence(request, response,
                        new JwtAuthenticationException(TokenError.Token.Expired));
                return;
            } catch (UnsupportedJwtException ex) {
                entryPoint.commence(request, response,
                        new JwtAuthenticationException(TokenError.Token.Unsupported));
                return;
            } catch (IllegalArgumentException ex) {
                entryPoint.commence(request, response,
                        new JwtAuthenticationException(TokenError.Token.Blank));
                return;
            }
        }
        filterChain.doFilter(request, response);
    }
}
