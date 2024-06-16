module.exports = {
  input: 'src',
  output: '',
  exclude: ['**/node_modules/**/*'],
  rules: {
    
    ts: {
      caller: '',
      functionName: 't',
      customizeKey: function getCustomizeKey(key, path) {
        return key
      },
      importDeclaration: 'import { t } from "i18next"',
    },
    
    tsx: {
      caller: '',
      functionName: 't',
      customizeKey: function getCustomizeKey(key, path) {
        return key
      },
      importDeclaration: 'import { t } from "i18next"',
      functionSnippets: '',
    },
    
  },
  prettier: { semi: false, singleQuote: true },
  incremental: false,
  skipExtract: true,
  localePath: './translate/zh-CN.json',
  localeFileType: 'json',
  excelPath: './locales.xlsx',
  exportExcel: false,
  skipTranslate: false,
  locales: ['en-US'],
  globalRule: { ignoreMethods: [] },
  adjustKeyMap: function (allKeyValue, currentFileKeyMap, currentFilePath) {
    return allKeyValue
  },
}
