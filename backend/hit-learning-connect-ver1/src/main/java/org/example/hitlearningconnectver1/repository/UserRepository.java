package org.example.hitlearningconnectver1.repository;

import org.example.hitlearningconnectver1.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u where u.username = :username")
    User findByUsername(String username);
}
