package org.example.hitlearningconnectver1.controller;

import lombok.RequiredArgsConstructor;
import org.example.hitlearningconnectver1.base.RestApiV1;
import org.example.hitlearningconnectver1.common.ApiResponse;
import org.example.hitlearningconnectver1.constants.AuthMessage;
import org.example.hitlearningconnectver1.domain.dto.request.LoginRequest;
import org.example.hitlearningconnectver1.domain.dto.request.RegisterRequest;
import org.example.hitlearningconnectver1.domain.dto.response.LoginResponse;
import org.example.hitlearningconnectver1.domain.dto.response.RegisterResponse;
import org.example.hitlearningconnectver1.service.impl.AuthServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RestApiV1
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    @Autowired
    AuthServiceImpl authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) throws Exception {
        return ResponseEntity.ok(ApiResponse.<RegisterResponse>builder()
                .status(HttpStatus.OK)
                .message(AuthMessage.Auth.REGISTER_SUCCESS)
                .data(authService.register(registerRequest))
                .build()
        );
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) throws Exception {
        return ResponseEntity.ok(ApiResponse.<LoginResponse>builder()
                .status(HttpStatus.OK)
                .message(AuthMessage.Auth.LOGIN_SUCCESS)
                .data(authService.login(loginRequest))
                .build()
        );
    }
}