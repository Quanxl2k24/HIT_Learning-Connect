package org.example.hitlearningconnectver1.domain.mapper;

import org.example.hitlearningconnectver1.domain.dto.request.RegisterRequest;
import org.example.hitlearningconnectver1.domain.dto.response.RegisterResponse;
import org.example.hitlearningconnectver1.domain.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AuthMapper {
    User toUser(RegisterRequest userRegisterRequest);

    @Mapping(source = "username", target = "username")
    @Mapping(source = "email", target = "email")
    @Mapping(source = "role", target = "role")
    RegisterResponse toUserRegisterResponse(User user);
}

