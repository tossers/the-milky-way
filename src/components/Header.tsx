import * as React from 'react';
import {Card, Button, Icon, Menu, message} from 'antd';
import {Link} from 'react-router-dom';
import {History} from 'history';
import './Header.css';
import { withRouter } from 'react-router';

class Header extends React.Component<{
    history?: History;
    name: string;
    isLogin: boolean;
    logout: () => Promise<void>;
}, {}> {

    handleOnClick = (item) => {
        if(item.key === 'logout'){
            this.props.logout().then(() => {
                (this.props.history as History).push('/login');
            }).catch((ex) => {
                message.error('退出失败:' + ex.message);
            });
        }
    };

    render() {
        const {name, isLogin} = this.props;
        return (
            <Card title={null} bodyStyle={{padding: '0'}}>
                <span><img style={{padding: '0px 50px', verticalAlign: 'middle'}} alt="" src={'image/logo.png'}/></span>
                <Button style={{background: 'rgb(235, 239, 241)'}} className={'headerBtn'} type={'primary'}>
                    <img alt="" src={'image/顶部-行情.png'}/>行情
                </Button>
                <Button className={'headerBtn'} type={'primary'}>
                    <img alt="" src={'image/顶部-交易.png'}/>交易
                </Button>
                {
                    isLogin ?
                        <Menu onClick={this.handleOnClick} style={{display: 'inline-block', float: 'right'}} mode={'horizontal'}>
                            <Menu.SubMenu title={<span><Icon type="user"/>{name}</span>}>
                                <Menu.Item key="logout">退出</Menu.Item> 你
                            </Menu.SubMenu>
                        </Menu>
                        :
                        <span style={{float: 'right', fontSize: '14px', padding: '10px 20px 0 0'}}>
                            <Icon style={{marginRight: '8px'}} type={'user'}/>
                            <Link to={'/login'}>登录</Link>
                            <span className={'ant-divider'}/><Link to={'/register'}>注册</Link>
                        </span>
                }
            </Card>
        );
    }
}

export default withRouter(Header);