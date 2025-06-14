package com.example.hit.product.doman.dto.reponse;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserReponse {

    private String username;

    private String password;

    private String lastName;

    private String email;
}
