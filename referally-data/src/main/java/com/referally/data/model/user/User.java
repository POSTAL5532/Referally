package com.referally.data.model.user;

import com.referally.data.model.AbstractEntity;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "users")
public class User extends AbstractEntity {

    private String name;

    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(name = "reg_date")
    private Date regDate;

    @Enumerated(EnumType.STRING)
    private UserStatus status;

    @Enumerated(EnumType.STRING)
    private UserConfirmStatus confirmStatus;

    public User() {
        super();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public Date getRegDate() {
        return regDate;
    }

    public void setRegDate(Date regDate) {
        this.regDate = regDate;
    }

    public UserStatus getStatus() {
        return status;
    }

    public void setStatus(UserStatus status) {
        this.status = status;
    }

    public UserConfirmStatus getConfirmStatus() {
        return confirmStatus;
    }

    public void setConfirmStatus(UserConfirmStatus confirmStatus) {
        this.confirmStatus = confirmStatus;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                ", regDate=" + regDate +
                ", status=" + status +
                ", confirmStatus=" + confirmStatus +
                ", id='" + id + '\'' +
                '}';
    }
}
