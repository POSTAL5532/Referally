import React from 'react';
import 'antd/dist/antd.less';
import {PageHeader} from "antd";
import {UnauthorizedRoute} from "app/components/CustomRoute";
import {LOGIN_PAGE_URL, LoginPage} from "app/logic/loginpage/LoginPage";
import {REGISTRATION_PAGE_URL, RegistrationPage} from "app/logic/registrationpage/RegistrationPage";
import {Redirect, Route, Switch} from "react-router";

const App = () => {
    return (
        <>
            <PageHeader title="ReferUP" subTitle="console application"/>

            <Switch>
                <UnauthorizedRoute path={LOGIN_PAGE_URL} exact component={LoginPage}/>
                <UnauthorizedRoute path={REGISTRATION_PAGE_URL} exact component={RegistrationPage}/>

                <Route render={() => <Redirect to={LOGIN_PAGE_URL}/>}/>
            </Switch>
        </>
    );
};

export default App;
