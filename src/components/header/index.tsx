import React, {useEffect, useState} from 'react';
import type {MenuProps} from 'antd';
import {Avatar, Dropdown, Space} from 'antd';
import {DownOutlined, LogoutOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import {storageUtils} from "../../utils/storageUtils";
import moment from 'moment'
import {useNavigate} from "react-router-dom";
import useStore from "../../store";
import i18n from 'i18next';
import SelectLang from '../selectLang';

const t = i18n.t;

const items = () => {
    let items: MenuProps['items'] = [
        {
            key: '1',
            label: t('menu.account.center'), 
            icon: <UserOutlined/>
        },
        {
            key: '2',
            label: t('menu.account.settings'),
            icon: <SettingOutlined/>
        },
        {
            type: 'divider',
        },
        {
            key: '3',
            label: t('menu.account.logout'),
            icon: <LogoutOutlined/>
        },
    ];
    return items;
};

interface LangMap {
    [key: string]: string;
}

const langMap: LangMap = {
    en: 'EN',
    zh: '简体',
    tw: '繁体'
};



const MyHeader: React.FC = () => {
    const {userName, avatar} = useStore()as any;
    let navigate = useNavigate();

    // #region 切换语言
    const lang = storageUtils.getI18n();
    const [language, setLanguage] = useState(lang);
    const languageChange = (value:any) => {
        setLanguage(value);
        // 切换语言时修改缓存数据
        storageUtils.setI18n(value);
        window.location.reload();
    }
    // #endregion

    const [currentTime, setCurrentTime] = useState<string>(moment().format('YYYY-MM-DD HH:mm:ss'));

    useEffect(() => {
        setInterval(() => {
            setCurrentTime(moment().format('YYYY-MM-DD HH:mm:ss'))
        }, 1000)
    }, []);

    const onClick: MenuProps['onClick'] = ({key}) => {
        if (key === "1") {
            navigate("/center")
        } else if (key === "2") {
            navigate("/setting")
        } else {
            storageUtils.logout()
            navigate("/login", {replace: true})
        }
    };

    
    return (
        <Space style={{ float: "right", marginRight: 30, height:'40px' }}>
            <span style={{ marginRight: 10 }}>{currentTime}</span>
           
            <SelectLang />
            
            <Dropdown menu={{items: items(), onClick}} placement="bottom" arrow>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <Avatar src={avatar} alt="avatar"/>
                        {userName}
                        <DownOutlined/>
                    </Space>
                </a>
            </Dropdown>
        </Space>
    );

};

export default MyHeader;