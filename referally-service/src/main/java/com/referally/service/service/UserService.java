package com.referally.service.service;

import com.referally.data.model.User;
import com.referally.data.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
