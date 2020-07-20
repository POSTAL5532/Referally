package com.referally.service.controller;

import com.referally.data.model.User;
import com.referally.service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Контроллер управления пользователями
 *
 * @author SIE
 */
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Возвращает информацию о пользователе
     */
    @GetMapping("/userinfo/{id}")
    public User getUserInfo(@PathVariable String id) {
        User user = new User();
        user.setId(id);
        user.setLogin("Postal5532");
        user.setEmail("evegnii-onegin123@gmail.com");
        user.setPassword("SOME_PASSWORD");
        return user;
    }
}
