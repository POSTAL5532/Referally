/**
 * Модель запроса на регистрацию
 */
import {observable} from "mobx";

export class UserRegData {

    @observable
    public name: string = null;

    @observable
    public email: string = null;

    @observable
    public password: string = null;

    @observable
    public rPassword: string = null;
}