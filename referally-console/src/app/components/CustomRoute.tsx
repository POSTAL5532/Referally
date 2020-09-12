import React from "react";
import {Redirect, Route, RouteProps} from "react-router";
import {TokenStore} from "app/service/TokenStore";
import {LOGIN_PAGE_URL} from "app/logic/loginpage/LoginPage";

const tokenStore = new TokenStore();

/**
 * Роут позволяет ограничить переход по страницам в зависимости от состояния авторизации.
 *
 * @param canActivate
 * @param redirect
 * @constructor
 */
const CustomRoute = (canActivate: () => boolean, redirect: string) => {
    return ({component: Component, ...other}: RouteProps) => {
        return (
            <Route {...other} render={
                props => (
                    canActivate()
                        ? <Component {...props}/>
                        : <Redirect to={{pathname: redirect, state: {from: props.location}}}/>
                )
            }/>
        );
    }
};

/**
 * Защищенный роут, переход по нему возможен только в том случае, когда есть токен.
 */
export const AuthorizedRoute = CustomRoute(() => tokenStore.tokenExists, LOGIN_PAGE_URL);


/**
 * Незащищенный роут, переход по нему возможен только в том случае, когда нет токена.
 */
export const UnauthorizedRoute = CustomRoute(() => !tokenStore.tokenExists, "/DASHBOARD_PAGE_URL");
