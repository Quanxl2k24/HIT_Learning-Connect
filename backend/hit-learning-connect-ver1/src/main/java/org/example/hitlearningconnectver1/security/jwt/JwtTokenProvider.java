package org.example.hitlearningconnectver1.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.hitlearningconnectver1.security.customeUserDetails.CustomUserDetails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.List;

@Component
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JwtTokenProvider {
    @Value("${jwt.secret}")
    String secretKey;

    @Value("${jwt.expirationMs}")
    long validityMs;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(Authentication auth) {
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        String username = auth.getName();
        Date now = new Date();
        Date expiry = new Date(now.getTime() + validityMs);

        List<String> roles = auth.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        return Jwts.builder()
                .setSubject(String.valueOf(userDetails.getId()))
                .claim("username", username)
                .claim("roles", roles)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(SignatureAlgorithm.HS256, getSigningKey())
                .compact();
    }

    public String generateToken(org.example.hitlearningconnectver1.domain.entity.User user) {

        String username = user.getEmail();
        Date now = new Date();
        Date expiry = new Date(now.getTime() + validityMs);

        List<String> roles = List.of(String.valueOf(user.getRole()));

        return Jwts.builder()
                .setSubject(String.valueOf(user.getId()))
                .claim("username", username)
                .claim("roles", roles)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(SignatureAlgorithm.HS256, getSigningKey())
                .compact();
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(getSigningKey())
                .parseClaimsJws(token)
                .getBody();

        String username = claims.get("username", String.class);
        List<String> roles = claims.get("roles", List.class);

        var authorities = roles.stream()
                .map(SimpleGrantedAuthority::new)
                .toList();

        UserDetails userDetails = new User(username, "", authorities);

        return new UsernamePasswordAuthenticationToken(
                userDetails,
                token,
                userDetails.getAuthorities()
        );
    }


    public void validateToken(String token) {
        Jwts.parser()
                .setSigningKey(getSigningKey())
                .parseClaimsJws(token);
    }
}
