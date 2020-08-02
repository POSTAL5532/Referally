package com.referally.service.model.useregdata;

import com.referally.service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * Проверка на уникальность email
 *
 * @author SIE
 */
public class EmailUniquenessValidator implements ConstraintValidator<EmailUniqueness, String> {

    @Autowired
    private UserService userService;

    @Override
    public boolean isValid(String email, ConstraintValidatorContext cxt) {
        return !userService.existByEmail(email);
    }
}
