import React, {Component} from "react";
import "app/logic/loginpage/LoginPage.less"
import {Button, Card, Form, Input} from "antd";
import {MailOutlined, LockOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {REGISTRATION_PAGE_URL} from "app/logic/registrationpage/RegistrationPage";

export const LOGIN_PAGE_URL = "/login";

/**
 * Страница авторизации
 */
export class LoginPage extends Component {

    render(): React.ReactElement {
        return (
            <div className="loginPage">
                <Card>
                    <h2>Авторизация</h2>
                    <Form>
                        <Form.Item>
                            <Input placeholder="Email" prefix={<MailOutlined/>}/>
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="Пароль" prefix={<LockOutlined/>}/>
                        </Form.Item>

                        <Button block type="primary">Войти</Button>
                        <Link to={REGISTRATION_PAGE_URL}>Регистрация</Link>
                    </Form>
                </Card>
            </div>
        );
    }
}