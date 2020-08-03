import {UserRegData} from "app/model/UserRegData";
import ApiClient from "app/service/ApiClient";
import {browserHistory} from "index";

export class UserService {

    private apiClient: ApiClient = new ApiClient();

    async login(): Promise<void> {
        // TODO
    }

    async registration(userRegData: UserRegData): Promise<void> {
        await this.apiClient.executePostRequest("/registration", userRegData);
        browserHistory.push("/LOGIN_PAGE_URL");
    }
}