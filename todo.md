# 运行起来
- 修改App.tsx, <BrowserRouter basename="/">
- 添加.env文件，REACT_APP_BASE_URL='http://localhost:8000'
- `npm install @craco/craco --save`
- `npm start`
- 修改package.json, `"craco-less": "^3.0.0",`
- 添加密码加密: `npm install md5 `
- 更新包: `npx create-react-app antd-admin`
- 添加多语言支持，参考[react-i18next](https://react.i18next.com/)
    - 安装依赖：`npm install react-i18next i18next i18next-browser-languagedetector `
    - 配置：    
        - 创建翻译文件：`mkdir src/i18n/locales && touch src/i18n/locales/zh-CN.json`
        - 修改index.tsx文件：
            ```参考[App.tsx](https://www.pipipi.net/37950.html)
        - 修改App.tsx文件：
 