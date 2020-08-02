package com.referally.service.model.useregdata;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

/**
 * @author SIE
 */
@PasswordEquivalence(password = "password", passwordMatch = "rPassword", message = "Пароли не совпадают")
public class UserRegData {

    @JsonIgnore
    public static final String PASSWORD_PATTERN = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,255}$";

    @JsonIgnore
    public static final String LOGIN_PATTERN = "^[a-zA-Z\\d][\\w\\d]{4,255}[a-zA-Z\\d]$";

    @NotBlank(message = "Логин не должен быть пустым")
    @LoginUniqueness(message = "Пользователь с таким логином уже зарегестрирован")
    @Pattern(regexp = LOGIN_PATTERN, message = "Значение логина не корректно")
    private String login;

    @NotBlank(message = "Email не должен быть пустым")
    @Email(message = "Значение Email не корректно")
    @EmailUniqueness(message = "Пользователь с таким email уже зарегестрирован")
    private String email;

    @NotBlank(message = "Пароль не должен быть пустым")
    @Pattern(regexp = PASSWORD_PATTERN, message = "Значение пароля не корректно")
    private String password;

    @JsonProperty("r_password")
    @NotBlank(message = "Повторный пароль не должен быть пустым")
    @Pattern(regexp = PASSWORD_PATTERN, message = "Значение повторного пароля не корректно")
    private String rPassword;

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getrPassword() {
        return rPassword;
    }

    public void setrPassword(String rPassword) {
        this.rPassword = rPassword;
    }

    @Override
    public String toString() {
        return "UserRegData{" +
                "login='" + login + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", rPassword='" + rPassword + '\'' +
                '}';
    }
}
