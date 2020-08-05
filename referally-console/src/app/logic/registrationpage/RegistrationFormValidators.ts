import {FormInstance, Rule, RuleObject, RuleRender} from "antd/lib/form";
import {requiredValidator} from "app/logic/CommonValidators";

export const nameValidators: Rule[] = [
    requiredValidator,
    {
        pattern: /^.{2,100}$/,
        message: "Имя должно быть длиной от 2 до 100 символов"
    }
];

export const emailValidators: Rule[] = [
    requiredValidator,
    {
        type: "email",
        message: "Не корректное значение Email"
    }
];

export const passwordValidators: Rule[] = [
    requiredValidator,
    {
        pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,20}$/,
        message: "Пароль должен содержать прописные и строчные латинские символы, цифры"
    }
];

// @ts-ignore
export const passwordEquivalenceValidator: RuleRender = (form: FormInstance): RuleObject => ({
        validator(rule, rPassword) {
            const password = form.getFieldValue("password");

            return (!rPassword || !password) || rPassword === password
                ? Promise.resolve()
                : Promise.reject("Пароли не совпадают");
        }
    }
);
