import React from 'react';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input, message} from 'antd';
import "./index.less"
import logo from '../../assets/images/logo.svg'
import {reqLogin} from "./service";
import {IResponse} from "../../api/ajax";
import {useNavigate} from "react-router-dom";
import {storageUtils} from "../../utils/storageUtils";
import md5 from 'md5';
import { t } from 'i18next';
import SelectLang from '../../components/selectLang';

const Login: React.FC = () => {
    let navigate = useNavigate();

    const onFinish = async (values: any) => {
        let { mobile, password } = values;
        password = md5(password);
        let res: IResponse = await reqLogin({ mobile, password })
        if (res.code === 0) {
            storageUtils.saveToken(res.data)
            // if (res.data.user_id) {
            //     localStorage.setItem('user_id', res.data.user_id);
            // }
            navigate('/home')
            message.success(res.msg);
        } else {
            message.error(res.msg);
        }
    };


    return (
        <div className='container'>
            <div className={'language'}>
                <SelectLang />
            </div>
            <div className={'header'}>
                <img src={logo} alt="logo"/>
                <h1>{t('pages.welcome.link')}</h1>
            </div>
            
            <div className={'content'}>
           
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="mobile"
                        rules={[{required: true, message: t('pages.login.username.required')}]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder={t('pages.login.username.placeholder')}/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: t('pages.login.password.required')}]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder={t('pages.login.password.placeholder')}
                        />
                    </Form.Item>
                    <Form.Item className={'login-form-item'}>
                        <Form.Item name="remember" valuePropName="checked" className={'login-form-remember'}>
                            <Checkbox>{t('pages.login.rememberMe')}</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            {t('pages.login.forgotPassword')}
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            {t('pages.login.submit')}
                        </Button>
                    </Form.Item>
                </Form></div>
        </div>
    );
};

export default Login;


