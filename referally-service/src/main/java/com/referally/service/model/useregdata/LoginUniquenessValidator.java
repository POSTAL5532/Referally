package com.referally.service.model.useregdata;

import com.referally.service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * Проверка на уникальность логина
 *
 * @author SIE
 */
public class LoginUniquenessValidator implements ConstraintValidator<LoginUniqueness, String> {

    @Autowired
    private UserService userService;

    @Override
    public boolean isValid(String login, ConstraintValidatorContext cxt) {
        return !userService.existByLogin(login);
    }
}
