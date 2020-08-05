import React, {Component} from "react";
import "app/logic/registrationpage/RegistrationPage.less"
import {Button, Card, Form, Input} from "antd";
import {UserOutlined, MailOutlined, LockOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {LOGIN_PAGE_URL} from "app/logic/loginpage/LoginPage";

export const REGISTRATION_PAGE_URL = "/registration";

/**
 * Страница регистрации
 */
export class RegistrationPage extends Component {

    render(): React.ReactElement {
        return (
            <div className="registrationPage">
                <Card>
                    <h2>Регистрация</h2>
                    <Form>
                        <Form.Item>
                            <Input placeholder="Email" prefix={<MailOutlined/>}/>
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="Пароль" prefix={<LockOutlined/>}/>
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="Повторите пароль" prefix={<LockOutlined/>}/>
                        </Form.Item>

                        <Button block type="primary">Зарегестрироваться</Button>
                        <Link to={LOGIN_PAGE_URL}>Авторизация</Link>
                    </Form>
                </Card>
            </div>
        );
    }
}