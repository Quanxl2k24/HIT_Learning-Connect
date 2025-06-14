package com.example.hit.product.service;


import com.example.hit.product.doman.model.User;

public interface UserService {

    User register(User user);
    User login(String username, String password);
}
