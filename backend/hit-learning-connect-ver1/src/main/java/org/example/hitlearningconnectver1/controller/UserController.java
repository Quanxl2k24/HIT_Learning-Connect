package org.example.hitlearningconnectver1.controller;

import lombok.RequiredArgsConstructor;
import org.example.hitlearningconnectver1.base.RestApiV1;
import org.example.hitlearningconnectver1.common.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RestApiV1
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    @GetMapping("/getMe")
    public ResponseEntity<?> profile(@AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(ApiResponse.<UserDetails>builder()
                .status(HttpStatus.OK)
                .data(user)
                .build()
        );
    }
}
