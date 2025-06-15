package org.example.hitlearningconnectver1.service.impl;

import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.example.hitlearningconnectver1.constants.AuthMessage;
import org.example.hitlearningconnectver1.constants.ErrorMessage;
import org.example.hitlearningconnectver1.domain.dto.request.LoginRequest;
import org.example.hitlearningconnectver1.domain.dto.request.RegisterRequest;
import org.example.hitlearningconnectver1.domain.dto.response.LoginResponse;
import org.example.hitlearningconnectver1.domain.dto.response.RegisterResponse;
import org.example.hitlearningconnectver1.domain.entity.Role;
import org.example.hitlearningconnectver1.domain.entity.User;
import org.example.hitlearningconnectver1.domain.entity.UserInfo;
import org.example.hitlearningconnectver1.domain.mapper.AuthMapper;
import org.example.hitlearningconnectver1.repository.UserRepository;
import org.example.hitlearningconnectver1.security.jwt.JwtTokenProvider;
import org.example.hitlearningconnectver1.service.IAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthServiceImpl implements IAuthService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthMapper authMapper;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    PasswordEncoder encoder;

    @Override
    public RegisterResponse register(RegisterRequest registerRequest) throws Exception {
        String username = registerRequest.getUsername();
        String password = registerRequest.getPassword();
        String repeatPassword = registerRequest.getRepeatPassword();

        User user = null;
        UserInfo info = new UserInfo();
        if (userRepository.findByUsername(username) != null) {
            throw new DataIntegrityViolationException(ErrorMessage.User.ERR_DUPLICATED_USERNAME);
        }

        if (password.equals(repeatPassword)) {
            user = authMapper.toUser(registerRequest);
        }

        user.setPassword(encoder.encode(user.getPassword()));
        user.setUsername(user.getUsername());
        user.setRole(Role.USER);

        user.setUserInfo(info);
        info.setUser(user);

        user = userRepository.save(user);

        if (user == null) {
            throw new Exception(AuthMessage.Auth.REGISTER_FAILED);
        }

        System.out.println(user.getUsername());
        System.out.println(user.getId());
        System.out.println(user.getRole());
        System.out.println(user.getEmail());
        return authMapper.toUserRegisterResponse(user);
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        Authentication auth;
        try {
            auth = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
        } catch (BadCredentialsException ex) {
            throw new BadCredentialsException("Wrong username or password", ex);
        }

        String token = jwtTokenProvider.generateToken(auth);
        return new LoginResponse(token);
    }
}
