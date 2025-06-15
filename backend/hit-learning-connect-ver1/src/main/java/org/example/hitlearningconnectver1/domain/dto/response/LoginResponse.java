package org.example.hitlearningconnectver1.domain.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class LoginResponse {
    String token;

    public LoginResponse(String token) {
        this.token = token;
    }
}
