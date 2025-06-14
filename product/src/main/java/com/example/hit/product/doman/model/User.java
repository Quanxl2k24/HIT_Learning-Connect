package com.example.hit.product.doman.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
//import jakarta.persistence.*;
import lombok.*;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name="user")
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 25, nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    @JsonIgnore
    private String password;

    @Column(length = 25, nullable = false, unique = true)
    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    @Enumerated(EnumType.ORDINAL)
    @Column(nullable = false)
    private Role role;

}
