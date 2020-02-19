<font face="Source Code Pro" color=#0099ff size= >PMS</font>

### 🚀 技术栈   
[![react](https://img.shields.io/badge/react-16.12.0-green)]()  
[![axios](https://img.shields.io/badge/axios-0.19.0-green)]()  
[![redux](https://img.shields.io/badge/redux-4.0.4-green)]()   
[![ant-design](https://img.shields.io/badge/ant--design-3.26.6-green.svg)]() 

### 📖 具体说明
- 项目环境搭建配置：umi
- 采用 Redux 实现项目数据状态管理；
- 封装 Axios 库实现与后台 http 请求交互；
- UI 采用 Ant-design 组件库；

### 🌲 目录结构

```
├── mock                    // 
├── src                     // 
│   ├── assets              // 静态资源
│   ├── components          // 公共组件
│   ├── layouts             // 布局组件
│   ├── models              // 数据管理
│   ├── pages               // 页面组件
│   ├── services            // http请求
│   ├── utils               // 工具函数
│   ├── app.js              // 
│   └── global.css          // 全局样式
├── .gitignore              // git忽略配置
├── .umiric.js              // 
├── package.json            // 依赖包配置
└── README.md               //
```

### 🌈 项目页面演示：
<img src="/src/assets/lc.png" width = "100" height = "100" alt="演示png/gif" align=center />

### 💻 CLI 构建命令 - bash or cmd
#### 克隆项目
```
git clone xxx
```
#### 初始化依赖配置
```
yarn install / yarn
```
#### 开发环境 内存中打包 开启虚拟服务器
```
yarn start
```
#### 生产环境 打包至本地
```
yarn build  //生产环境 打包构建
yarn build:report // 图形化分析打包文件大小；
yarn build:watch // 方便排查生产环境打包后文件的错误信息（文件source map）；
```