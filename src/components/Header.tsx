import * as React from 'react';
import {Card, Button, Icon} from 'antd';
import { Link } from 'react-router-dom';
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
                <span style={{float: 'right', fontSize: '14px', padding: '10px 20px 0 0'}}>
                    <Icon style={{marginRight: '8px'}} type={'user'}/>
                    <Link to={'/login'}>登录</Link>
                    <span className={'ant-divider'}/>
                    <Link to={'/register'}>注册</Link>
                </span>
            </Card>
        );
    }
}
