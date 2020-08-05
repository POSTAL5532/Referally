package com.referally.service.controller;

import com.referally.data.model.user.User;
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
    @GetMapping("/userinfo/{email}")
    public User getUserInfo(@PathVariable String email) {
        return this.userService.getByEmail(email);
    }
}
