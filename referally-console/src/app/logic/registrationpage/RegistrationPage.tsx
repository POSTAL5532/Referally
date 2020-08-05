import React, {Component} from "react";
import "app/logic/registrationpage/RegistrationPage.less"
import {Button, Card, Form, Input, Spin} from "antd";
import {MailOutlined, LockOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {LOGIN_PAGE_URL} from "app/logic/loginpage/LoginPage";
import {observer} from "mobx-react";
import {RegistrationPageStore} from "app/logic/registrationpage/RegistrationPageStore";
import {
    emailValidators,
    nameValidators, passwordEquivalenceValidator,
    passwordValidators
} from "app/logic/registrationpage/RegistrationFormValidators";

export const REGISTRATION_PAGE_URL = "/registration";

/**
 * Страница регистрации
 */
@observer
export class RegistrationPage extends Component {

    registrationPageStore: RegistrationPageStore = new RegistrationPageStore();

    onFinish = () => {
        this.registrationPageStore.registerUser();
    };

    render(): React.ReactElement {
        const {userRegData, registerProcess} = this.registrationPageStore;

        return (
            <div className="registrationPage">
                <Card>
                    <h2>Регистрация</h2>
                    <Spin spinning={registerProcess}>
                        <Form onFinish={this.onFinish} initialValues={userRegData} validateTrigger="onBlur">
                            <Form.Item name="name" rules={nameValidators}>
                                <Input placeholder="Имя"
                                       prefix={<MailOutlined/>}
                                       onChange={event => userRegData.name = event.target.value}/>
                            </Form.Item>

                            <Form.Item name="email" rules={emailValidators}>
                                <Input placeholder="Email"
                                       prefix={<MailOutlined/>}
                                       onChange={event => userRegData.email = event.target.value}/>
                            </Form.Item>

                            <Form.Item name="password" rules={passwordValidators}>
                                <Input placeholder="Пароль"
                                       prefix={<LockOutlined/>}
                                       onChange={event => userRegData.password = event.target.value}/>
                            </Form.Item>

                            <Form.Item name="rPassword" rules={[...passwordValidators, passwordEquivalenceValidator]}
                                       dependencies={["password"]}>
                                <Input placeholder="Повторите пароль"
                                       prefix={<LockOutlined/>}
                                       onChange={event => userRegData.rPassword = event.target.value}/>
                            </Form.Item>

                            <Button block type="primary" htmlType="submit">Зарегестрироваться</Button>
                            <Link to={LOGIN_PAGE_URL}>Авторизация</Link>
                        </Form>
                    </Spin>
                </Card>
            </div>
        );
    }
}