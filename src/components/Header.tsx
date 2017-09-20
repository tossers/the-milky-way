import * as React from 'react';
import {Card, Button} from 'antd';
import './Header.css';

export class Header extends React.Component<{}, {}> {
    render() {
        return (
            <Card title={null} bodyStyle={{padding: '0'}}>
                <span><img style={{padding: '0px 50px', verticalAlign: 'middle'}} alt="" src={'image/logo.png'}/></span>
                <Button style={{background: 'rgb(235, 239, 241)'}} className={'headerBtn'} type={'primary'}>
                    <img alt="" src={'image/顶部-行情.png'}/>行情
                </Button>
                <Button className={'headerBtn'} type={'primary'}>
                    <img alt="" src={'image/顶部-交易.png'}/>交易
                </Button>
            </Card>
        );
    }
}
