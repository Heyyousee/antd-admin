import React, { useState } from 'react';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input, message} from 'antd';
import "./index.less"
import logo from '../../assets/images/logo.svg'
import {reqLogin} from "./service";
import {IResponse} from "../../api/ajax";
import {useNavigate} from "react-router-dom";
import {storageUtils} from "../../utils/storageUtils";
import md5 from 'md5';
import i18n from 'i18next';

const Login: React.FC = () => {
    const t = i18n.t;
    let navigate = useNavigate();

    // #region 切换语言
    const lang = storageUtils.getI18n();
    const [language, setLanguage] = useState(lang);
    const languageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
        // 切换语言时修改缓存数据
        storageUtils.setI18n(e.target.value);
        window.location.reload();
    }
    // #endregion

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
                <select value={language} onChange={languageChange} >
                    <option value="zh">简体</option>
                    <option value="tw">繁体</option>
                    <option value="en">EN</option>
                </select>
            </div>
            <div className={'header'}>
                <img src={logo} alt="logo"/>
                <h1>{t('login.react-xiang-mu')}</h1>
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
                        rules={[{required: true, message: t('login.yong-hu-ming-ti-si')}]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder={t('login.username')}/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: t('login.mi-ma-ti-si')}]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder={t('login.password')}
                        />
                    </Form.Item>
                    <Form.Item className={'login-form-item'}>
                        <Form.Item name="remember" valuePropName="checked" className={'login-form-remember'}>
                            <Checkbox>{t('login.zi-dong-deng-lu')}</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            {t('login.wang-ji-mi-ma')}
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            {t('login.deng-lu')}
                        </Button>
                    </Form.Item>
                </Form></div>
        </div>
    );
};

export default Login;


