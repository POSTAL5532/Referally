package com.referally.service.model.useregdata;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

/**
 * Проверка на уникальность логина
 *
 * @author SIE
 */
@Documented
@Constraint(validatedBy = LoginUniquenessValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface LoginUniqueness {
    String message() default "Non unique field";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
