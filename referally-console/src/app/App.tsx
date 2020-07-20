import React from 'react';
import 'antd/dist/antd.less';
import {PageHeader, Result} from "antd";

const App = () => {
    return (
        <>
            <PageHeader title="Referally" subTitle="console application"/>
            <Result
                status="404"
                title="Hmmm....."
                subTitle="UFO flew in and stole content."
            />
        </>
    );
};

export default App;
