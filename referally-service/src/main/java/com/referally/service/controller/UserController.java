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
    @GetMapping("/userinfo/{login}")
    public User getUserInfo(@PathVariable String login) {
        return this.userService.getByLogin(login);
    }
}
