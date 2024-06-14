import React, {useState} from 'react';
import type {MenuProps} from 'antd';
import {Avatar, Dropdown, Space} from 'antd';
import {DownOutlined} from "@ant-design/icons";
import {storageUtils} from "@/utils/storageUtils";
import i18n from 'i18next';
import { Icon } from '@iconify/react';
import "./index.less"

const t = i18n.t;

const langs: MenuProps['items'] = [
    {
        key: 'zh',
        label: '简体', 
        icon: <Icon icon="circle-flags:cn" />
    },
    {
        key: 'tw',
        label: '繁体',
        icon: <Icon icon="circle-flags:tw" />
    },
    {
        key: 'en',
        label: 'EN',
        icon: <Icon icon="circle-flags:en" />
    },
];

interface LangMap {
    [key: string]: string;
}

const langMap: LangMap = {
    en: 'EN',
    zh: '简体',
    tw: '繁体'
};



const SelectLang: React.FC = () => {

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
    
    const onClick_lang: MenuProps['onClick'] = ({key}) => {
        languageChange(key);
    };

    return (
        <Space style={{ float: "right", marginRight: 10 }}>
            <Dropdown menu={{items: langs, onClick: onClick_lang}} placement="bottom" arrow>
                <a onClick={(e) => e.preventDefault()}>
                    <Space className='space'>
                        <div className={'avatar'}><Icon icon="mdi:translate-variant" width={24} /></div>
                        {/* <Icon icon={"circle-flags:" + language} height={20} "mdi:translate-variant"/> */}
                        <DownOutlined/>
                    </Space>
                </a>
            </Dropdown>
           
        </Space>
    );

};

export default SelectLang;