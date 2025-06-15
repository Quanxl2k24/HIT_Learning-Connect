package org.example.hitlearningconnectver1.service;

import org.example.hitlearningconnectver1.domain.dto.request.LoginRequest;
import org.example.hitlearningconnectver1.domain.dto.request.RegisterRequest;
import org.example.hitlearningconnectver1.domain.dto.response.LoginResponse;
import org.example.hitlearningconnectver1.domain.dto.response.RegisterResponse;

public interface IAuthService {
    RegisterResponse register(RegisterRequest registerRequest) throws Exception;

    LoginResponse login(LoginRequest loginRequest);
}
