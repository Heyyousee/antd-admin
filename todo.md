# 运行起来
- 修改App.tsx, <BrowserRouter basename="/">
- 添加.env文件，REACT_APP_BASE_URL='http://localhost:8000'
- `npm install @craco/craco --save`
- `npm start`
- 修改package.json, `"craco-less": "^3.0.0",`
`npm audit fix --force`
- `npm install md5 --save `