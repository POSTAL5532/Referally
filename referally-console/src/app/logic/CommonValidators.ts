import {Rule} from "antd/lib/form";

export const requiredValidator: Rule = {
    required: true,
    message: "Поле обязательно для заполнения"
}