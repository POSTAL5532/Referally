package com.referally.service.controller;

import com.referally.service.model.useregdata.UserRegData;
import com.referally.service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * Контроллер для выполнения операций с пользователями
 *
 * @author SIE
 */
@RestController
@Validated
public class AuthController {

    @Autowired
    private UserService userService;

    /**
     * Регестрирует нового пользователя.
     *
     * @param data данные для регистрации
     * @return пустой ответ
     */
    @PostMapping("/registration")
    public ResponseEntity<Object> registration(@RequestBody @Valid UserRegData data) {
        this.userService.registerUser(data);
        return ResponseEntity.created(null).build();
    }
}
