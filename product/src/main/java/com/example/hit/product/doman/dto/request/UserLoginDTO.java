package com.example.hit.product.doman.dto.request;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public class UserLoginDTO {
    @NotNull
    String username;

    @NotNull
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=\\S+$).{8,}$")
    String password;

    public @NotNull String getUsername() {
        return username;
    }

    public void setUsername(@NotNull String username) {
        this.username = username;
    }

    public @NotNull @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=\\S+$).{8,}$") String getPassword() {
        return password;
    }

    public void setPassword(@NotNull @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=\\S+$).{8,}$") String password) {
        this.password = password;
    }

}
