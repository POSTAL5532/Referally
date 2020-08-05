package com.referally.data.repository;

import com.referally.data.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findById(String id);

    Optional<User> findByEmail(String name);

    Boolean existsByEmail(String email);
}
