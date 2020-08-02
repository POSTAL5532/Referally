package com.referally.service.model.useregdata;

import javax.validation.Constraint;
import java.lang.annotation.*;

/**
 * Проверка на совпадение паролей логина
 *
 * @author SIE
 */
@Constraint(validatedBy = PasswordEquivalenceValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface PasswordEquivalence {

    String message() default "Fields not equivalence";

    String password();

    String passwordMatch();

    Class<?>[] groups() default {};

    Class<?>[] payload() default {};

    @Target({ElementType.TYPE})
    @Retention(RetentionPolicy.RUNTIME)
    @interface List {
        PasswordEquivalence[] value();
    }

}
