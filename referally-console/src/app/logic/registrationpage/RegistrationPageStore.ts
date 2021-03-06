import {UserService} from "app/service/UserService";
import {observable} from "mobx";
import {UserRegData} from "app/model/UserRegData";
import {browserHistory} from "index";
import {LOGIN_PAGE_URL} from "app/logic/loginpage/LoginPage";

/**
 * Стор страницы регистрации
 */
export class RegistrationPageStore {

    userService: UserService = new UserService();

    @observable
    userRegData: UserRegData = new UserRegData();

    /**
     * Признак процесса выполнения асинхронной операции
     */
    @observable
    registerProcess: boolean = false;

    registerUser = () => {
        this.registerProcess = true;
        this.userService.registration(this.userRegData)
            .then(() => {
                browserHistory.push(LOGIN_PAGE_URL);
            })
            .finally(() => {
                this.registerProcess = false;
            });
    }
}