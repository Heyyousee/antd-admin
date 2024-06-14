# 运行起来
- 修改App.tsx, <BrowserRouter basename="/">
- 添加.env文件，REACT_APP_BASE_URL='http://localhost:8000'
- `npm install @craco/craco --save`
- `npm start`
- 修改package.json, `"craco-less": "^3.0.0",`
# 添加功能
- 添加密码加密: `npm install md5 `
- 更新包: `npx create-react-app antd-admin`
- 添加多语言支持
    - 安装依赖：`npm install react-i18next i18next i18next-browser-languagedetector `
    - 创建翻译文件：`mkdir src/locales && touch src/locales/zh-CN.json`
    - 创建index.tsx文件：`mkdir src/i18n && touch src/i18n/index.tsx`
    - 创建selectLang组件.
    - 在pages/admin和pages/login添加selectLang组件
- 添加"@/utils/storageUtils"路径支持
    - 添加paths.json, 修改tsconfig.json,添加: "extends":"./paths.json"
    - 修改craco.config.js,添加webpack:{}