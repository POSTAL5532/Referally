package com.referally.data.model;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User extends AbstractEntity {

    private String login;

    private String email;

    private String password;

    public User() {
        super();
    }

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

    @Override
    public String toString() {
        return "User{" +
                "login='" + login + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", id='" + id + '\'' +
                '}';
    }
}
