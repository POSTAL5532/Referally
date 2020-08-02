package com.referally.service.model.useregdata;

import org.springframework.beans.BeanWrapperImpl;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * Проверка на совпадение паролей логина
 *
 * @author SIE
 */
public class PasswordEquivalenceValidator implements ConstraintValidator<PasswordEquivalence, Object> {

    private String password;

    private String passwordMatch;

    @Override
    public void initialize(PasswordEquivalence constraintAnnotation) {
        this.password = constraintAnnotation.password();
        this.passwordMatch = constraintAnnotation.passwordMatch();
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        Object password = new BeanWrapperImpl(value).getPropertyValue(this.password);
        Object passwordMatch = new BeanWrapperImpl(value).getPropertyValue(this.passwordMatch);

        if (password != null) {
            return password.equals(passwordMatch);
        } else {
            return passwordMatch == null;
        }
    }
}
