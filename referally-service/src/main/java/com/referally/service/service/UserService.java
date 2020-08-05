package com.referally.service.service;

import com.referally.data.model.user.User;
import com.referally.data.model.user.UserConfirmStatus;
import com.referally.data.model.user.UserRole;
import com.referally.data.model.user.UserStatus;
import com.referally.data.repository.UserRepository;
import com.referally.service.model.useregdata.UserRegData;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;

/**
 * Сервис для выполнения операций с данными пользователей {@link User}
 *
 * @author SIE
 */
@Service
@Transactional(readOnly = true)
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User get(String id) {
        return this.userRepository
                .findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id : " + id));
    }

    public User getByEmail(String email) {
        return this.userRepository
                .findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email : " + email));
    }

    @Transactional(readOnly = false)
    public String registerUser(UserRegData data) {
        User newUser = new User();
        newUser.setName(data.getName());
        newUser.setEmail(data.getEmail());
        newUser.setPassword(this.passwordEncoder.encode(data.getPassword()));
        newUser.setStatus(UserStatus.ACTIVE);
        newUser.setConfirmStatus(UserConfirmStatus.UNCONFIRMED);
        newUser.setRole(UserRole.ROLE_USER);
        newUser.setRegDate(Date.valueOf(LocalDate.now()));

        return this.userRepository
                .save(newUser)
                .getId();
    }

    public Boolean existByEmail(String email) {
        return this.userRepository.existsByEmail(email);
    }
}
