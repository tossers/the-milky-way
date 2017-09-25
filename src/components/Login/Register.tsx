import * as React from 'react';
import {Form, Input, Button} from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';
import '../../routes/Login.css';

class RegisterForm extends React.Component<FormComponentProps &{
    title: string;
    type:  string   //'register' | 'changePassword';
}, {
    phoneHolder: string;
    passwordHolder: string;
    messageCodeHolder: string;
    phone: string,
    password: string,
    messageCode: string,
    passwordConfirm: string;
    passwordConfirmHolder: string;
    check: boolean,    //风险阅读判断
    count: number,
    confirmDirty: boolean,
    readHelp: boolean,
}> {
    state = {
        phoneHolder: '手机号',
        passwordHolder: '密码由8-16位英文和数字组成',
        messageCodeHolder: '短信验证码',
        passwordConfirmHolder: '确认密码',
        passwordConfirm: '',
        phone: '',
        password: '',
        messageCode: '',
        check: false,
        count: 60,
        confirmDirty: false,
        readHelp: false,
    };
    interval;

    componentDidMount(){
        this.props.form.setFieldsValue({phone: '', password: ''});
    }

    CountOneMinute = () => {
        this.interval = setInterval(() => {
            let {count} = this.state;
            if (count <= 1) {
                clearInterval(this.interval);
                this.setState({count: 60});
                return;
            }
            this.setState({count: count - 1});
        }, 1000);
    };

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true }, () => null);
        }
        callback();
    };

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一样!');
        } else {
            callback();
        }
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    checkPhone = (rule, value, callback) => {
        let pattern = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const {check} = this.state;
                if(!check){
                    this.setState({readHelp: true});
                }
                console.log(values);
            }
        });
    };

    render() {
        const {title, type} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {
            phoneHolder,
            passwordHolder,
            messageCodeHolder,
            phone,
            password,
            messageCode,
            check,
            count,
            passwordConfirmHolder,
            passwordConfirm,
            readHelp,
        } = this.state;
        return (
            <Form onSubmit={this.handleSubmit} style={{marginTop: '10px', position: 'relative'}}>
                <Form.Item hasFeedback={true}>
                    <span className={'placeholder'} style={{display: phone || !phoneHolder ? '' : 'none'}}>手机号</span>
                    {getFieldDecorator('phone', {
                        rules: [{
                            required: true, message: '请输入手机号码!'
                        },{
                            validator: this.checkPhone,
                        }],
                    })(
                        <Input
                            size="large"
                            placeholder={phoneHolder}
                            onChange={(e) => this.setState({phone: e.target.value})}
                            onBlur={() => this.setState({phoneHolder: '手机号'})}
                            onFocus={() => this.setState({phoneHolder: ''})}
                        />
                    )}

                </Form.Item>
                <Form.Item hasFeedback={true}>
                    <span className={'placeholder'}
                          style={{display: password || !passwordHolder ? '' : 'none'}}>密码</span>
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入密码',
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input
                            type="password"
                            size="large"
                            placeholder={passwordHolder}
                            onChange={(e) => this.setState({password: e.target.value})}
                            onBlur={() => this.setState({passwordHolder: '密码由8-16位英文和数字组成'})}
                            onFocus={() => this.setState({passwordHolder: ''})}
                        />
                    )}
                </Form.Item>
                <Form.Item hasFeedback={true} style={type !== 'register'?{}:{marginBottom: 0}}>
                    <span className={'placeholder'}
                          style={{display: passwordConfirm || !passwordConfirmHolder ? '' : 'none'}}>确认密码</span>
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请确认密码',
                        }, {
                            validator: this.checkPassword,
                        }],
                    })(
                        <Input
                            type="password"
                            size="large"
                            placeholder={passwordConfirmHolder}
                            onChange={(e) => this.setState({password: e.target.value})}
                            onBlur={(e) => {
                                this.handleConfirmBlur(e);
                                this.setState({passwordConfirmHolder: '确认密码'});
                            }}
                            onFocus={() => this.setState({passwordConfirmHolder: ''})}
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <span className={'placeholder'} style={{display: messageCode || !messageCodeHolder ? '' : 'none'}}>短信验证码</span>
                    {getFieldDecorator('messageCode', {
                        rules: [{
                            required: true, message: '请输入验证码!'
                        }],
                    })(
                        <Input
                            size="large"
                            placeholder={messageCodeHolder}
                            suffix={
                                <div style={{width: '100px', fontSize: '14px'}}>
                                    <span style={{height: '10px'}} className="ant-divider"/>
                                    {
                                        count === 60 ?
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
                <Form.Item style={{marginTop: 0}}>
                    {
                        type !== 'register' ? null :
                            <span style={{float: 'left', color: 'rgba(191, 191, 191, 0.9)'}}>
                                <img
                                    alt=""
                                    style={{height: '10px', margin: '0 5px'}}
                                    onClick={() => this.setState({check: !check, readHelp: check})}
                                    src={`image/${check ? '已' : '未'}阅读风险说明.png`}/>我已认真阅读<a>风险说明</a>
                                {!readHelp? null: <span style={{color: 'red'}}> 请阅读风险说明!</span>}
                            </span>
                    }
                    <Button
                        type={'primary'}
                        htmlType="submit"
                        style={{border: 0, height: '45px', width: '100%', background: '#3D77B6'}}
                    >{title}</Button>
                </Form.Item>

            </Form>
        );
    }
}

export const Register = Form.create()(RegisterForm);