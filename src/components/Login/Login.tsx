import * as React from 'react';
import {Form, Input, Button} from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';
import './Index.css';

class LoginForm extends React.Component<FormComponentProps& {
    changePassword: () => void;
}, {
    phoneHolder: string;
    passwordHolder: string;
    codeHolder: string;
    phone: string,
    password: string,
    code: string,
    messageCode: string;
    messageCodeHolder: string;
    userMessage: boolean, //使用短信登录
    count: number,
}> {
    state = {
        phoneHolder: '手机号',
        passwordHolder: '密码',
        codeHolder: '请输入右侧验证码',
        messageCodeHolder: '短信验证码',
        messageCode: '',
        phone: '',
        password: '',
        code: '',
        userMessage: true,
        count: 60,
    };
    interval;
    CountOneMinute = () => {
        this.interval = setInterval(() => {
            let {count} = this.state;
            if(count === 0){
                clearInterval(this.interval);
                this.setState({count: 60});
                return;
            }
            this.setState({count: count - 1});
        }, 1000);
    };
    checkPhone = (rule, value, callback) => {
        let pattern = /^((\(\d{3}\))|(\d{3}\-))?13\d{9}$/;
        if (pattern.test(value)) {
            this.setState({phone: value});
            callback();
        }else {
            this.setState({phone: ''});
            if(value){
                callback('请输入正确格式的手机号码');
            }else{
                callback();
            }
        }
    };
    render() {
        const {changePassword} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {phoneHolder, passwordHolder, codeHolder, phone, password, code, userMessage, messageCode, messageCodeHolder, count} = this.state;
        return (
            <Form style={{marginTop: '10px', position: 'relative'}}>
                <Form.Item hasFeedback={true}>
                    <span className={'placeholder'} style={{display: phone || !phoneHolder ? '': 'none'}}>手机号</span>
                    {getFieldDecorator('phone', {
                        rules: [{
                            required: true, message: '请输入手机号码!'
                        },{
                            validator: this.checkPhone,
                        }],
                    })(
                        <Input
                            size="large"
                            value={phone}
                            placeholder={phoneHolder}
                            onChange={(e) => this.setState({phone: e.target.value})}
                            onBlur={() => this.setState({phoneHolder: '手机号'})}
                            onFocus={() => this.setState({phoneHolder: ''})}
                        />
                    )}
                </Form.Item>
                {
                    userMessage? null:
                        <Form.Item>
                            <span className={'placeholder'} style={{display: password || !passwordHolder ? '': 'none'}}>密码</span>
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: '请输入密码!'
                                }],
                            })(
                                <Input
                                    type="password"
                                    size="large"
                                    value={password}
                                    placeholder={passwordHolder}
                                    onChange={(e) => this.setState({password: e.target.value})}
                                    onBlur={() => this.setState({passwordHolder: '密码'})}
                                    onFocus={() => this.setState({passwordHolder: ''})}
                                />
                            )}
                        </Form.Item>
                }
                <Form.Item>
                    <span className={'placeholder'} style={{display: code || !codeHolder ? '': 'none'}}>验证码</span>
                    {getFieldDecorator('code', {
                        rules: [{
                            required: true, message: '请输入验证码!'
                        }],
                    })(
                        <Input
                            size="large"
                            value={code}
                            placeholder={codeHolder}
                            suffix={<img style={{width: '100px', background: '#00a854', height: '35px'}} alt="" />}
                            onChange={(e) => this.setState({code: e.target.value})}
                            onBlur={() => this.setState({codeHolder: '请输入右侧验证码'})}
                            onFocus={() => this.setState({codeHolder: ''})}
                        />
                    )}
                </Form.Item>
                {
                    !userMessage? null:
                    <Form.Item>
                        <span className={'placeholder'} style={{display: messageCode || !messageCodeHolder ? '': 'none'}}>短信验证码</span>
                        {getFieldDecorator('messageCode', {
                            rules: [{
                                required: true, message: '请输入验证码!'
                            }],
                        })(
                            <Input
                                size="large"
                                value={messageCode}
                                placeholder={messageCodeHolder}
                                suffix={
                                    <div style={{width: '100px', fontSize: '14px'}}>
                                        <span style={{height: '10px'}} className="ant-divider" />
                                        {
                                            count === 60?
                                                <a onClick={this.CountOneMinute}>发送验证码</a> :
                                                <span>{count}s 重新发送</span>
                                        }
                                    </div>}
                                onChange={(e) => this.setState({messageCode: e.target.value})}
                                onBlur={() => this.setState({messageCodeHolder: '短信验证码'})}
                                onFocus={() => this.setState({messageCodeHolder: ''})}
                            />
                        )}
                    </Form.Item>
                }
                <Form.Item className={'aTag'}>
                    <Button style={{border: 0, height: '45px', width: '100%', background: '#3D77B6'}} type={'primary'}>登录</Button>
                    <span style={{float: 'left', color: 'rgba(191, 191, 191, 0.9)'}}><a onClick={() => {changePassword();}}>忘记密码?</a></span>
                    <span style={{float: 'right', color: 'rgba(191, 191, 191, 0.9)'}}>
                        {
                            userMessage?
                                <a onClick={() => this.setState({userMessage: !userMessage})}>用登录密码登录</a>:
                                <a onClick={() => this.setState({userMessage: !userMessage})}>用短信验证码登录</a>
                        }
                    </span>
                </Form.Item>
                <Form.Item>
                    <div style={{display: 'flex'}}>
                        <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <img alt="" src={'image/微信.png'} style={{cursor: 'pointer', display: 'block'}}/>
                            <span style={{display: 'block'}}>微信登录</span>
                        </div>
                        <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <img alt="" src={'image/QQ.png'} style={{cursor: 'pointer', display: 'block'}}/>
                            <span style={{display: 'block'}}>QQ登录</span>
                        </div>
                    </div>
                </Form.Item>
            </Form>
        );
    }
}

export const Login = Form.create()(LoginForm);