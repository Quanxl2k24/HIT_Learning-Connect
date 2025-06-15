package org.example.hitlearningconnectver1.domain.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class RegisterResponse {
    String username;
    String email;
    String role;
    String provider;
}
