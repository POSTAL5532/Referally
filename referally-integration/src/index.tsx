import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from "react-router-dom";
import App from 'app/App';
import {createBrowserHistory} from "history";

export const browserHistory = createBrowserHistory();

ReactDOM.render(
    <Router history={browserHistory}>
        <App/>
    </Router>,
    document.getElementById('root')
);
