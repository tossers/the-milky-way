import * as React from 'react';
import {Tabs, Icon} from 'antd';
import './Index.css';
import {Login} from './Login';
import {Register} from './Register';
const TabPane = Tabs.TabPane;
export class Index extends React.Component<{}, {
    type: string;
}> {
    state = {
        type: 'register',
    };

    render() {
        const {type} = this.state;
        return (
            <div className={'login'} style={{background: `url('image/背景.png')`}}>
                <div style={{textAlign: 'center'}}>
                    <div style={{fontSize: '40px'}}>银河贵金属</div>
                    <div style={{fontSize: '40px'}}>—</div>
                    <div style={{fontSize: '20px'}}>轻松投资，智能全球</div>
                    <div style={{fontSize: '20px'}}>277,847,287位投资用户的选择</div>
                </div>
                <img src={'image/logo--登录.png'}/>
                {/*<img className={'closeImg'} src={'image/登录=-关闭.png'}/>*/}
                <Icon className="closeImg" type={'close'}/>
                <div>
                    {
                        type === 'register'?
                            <Tabs>
                                <TabPane tab={'登录'} key={'1'} >
                                    <Login changePassword={() => this.setState({type: 'changePassword'})}/>
                                </TabPane>
                                <TabPane tab={'注册'} key={'2'} >
                                    <Register type={'register'} title={'完成注册'}/>
                                </TabPane>
                            </Tabs>:
                            <div>
                                <span onClick={() => this.setState({type: 'register'})} className={'backSpan'}><img alt={''} src={'image/返回.png'}/>返回</span>
                                <div style={{marginTop: '60px'}}>
                                    <span style={{
                                        color: '#0e77ca',
                                        fontSize: '20px',
                                        paddingBottom: '5px',
                                        borderBottom: '2px solid #0e77ca'}}>修改密码</span>
                                </div>
                                <Register type={'changePassword'} title={'修改密码'}/>
                            </div>
                    }

                </div>
            </div>
        );
    }
}