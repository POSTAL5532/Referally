package com.referally.service.service;

import com.referally.data.model.user.User;
import com.referally.data.model.user.UserConfirmStatus;
import com.referally.data.model.user.UserRole;
import com.referally.data.model.user.UserStatus;
import com.referally.data.repository.UserRepository;
import com.referally.service.model.useregdata.UserRegData;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User get(String id) {
        return this.userRepository
                .findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id : " + id));
    }

    public User getByLogin(String login) {
        return this.userRepository
                .findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with login : " + login));
    }

    @Transactional(readOnly = false)
    public String registerUser(UserRegData data) {
        User newUser = new User();
        newUser.setLogin(data.getLogin());
        newUser.setEmail(data.getEmail());
        newUser.setPassword(data.getPassword());
        newUser.setStatus(UserStatus.ACTIVE);
        newUser.setConfirmStatus(UserConfirmStatus.UNCONFIRMED);
        newUser.setRole(UserRole.ROLE_USER);
        newUser.setRegDate(Date.valueOf(LocalDate.now()));

        return this.userRepository
                .save(newUser)
                .getId();
    }

    public Boolean existByLogin(String login) {
        return this.userRepository.existsByLogin(login);
    }

    public Boolean existByEmail(String email) {
        return this.userRepository.existsByEmail(email);
    }
}
