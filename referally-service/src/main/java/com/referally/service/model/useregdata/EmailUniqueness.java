package com.referally.service.model.useregdata;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

/**
 * Проверка на уникальность email
 *
 * @author SIE
 */
@Documented
@Constraint(validatedBy = EmailUniquenessValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface EmailUniqueness {
    String message() default "Non unique field";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

