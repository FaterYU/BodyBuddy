# BodyBuddy

![example workflow](https://github.com/FaterYU/BodyBuddy/actions/workflows/main_ci.yml/badge.svg)

## 项目进度

- [x] 项目初始化
- [x] Github Actions 配置
- [ ] 开发：导航栏
- [ ] 开发：页面

## 规范

### 代码规范

- [JavaScript 规范](https://zh-google-styleguide.readthedocs.io/en/latest/google-javascript-styleguide/javascript_language_rules/#)

### git commit/pull request 规范

使用**angular 规范**，已配置 [CI](./.github/workflows/main_ci.yml) 检查，不符合规范的提交会被拒绝。

- [规范英文原件](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)
- [规范中文播客](https://zj-git-guide.readthedocs.io/zh-cn/latest/message/Angular%E6%8F%90%E4%BA%A4%E4%BF%A1%E6%81%AF%E8%A7%84%E8%8C%83/)

## 依赖环境

- Node.js
- yarn
- Android Studio

## 快速启动

### 安装依赖

```bash
yarn
```

### 启动开发环境

```bash
yarn start
```

## 项目结构

> 没提到的文件/文件夹不用管

```bash
├── android # Android 项目（不用管）
├── ios # iOS 项目（不用管）
├── src # 源代码
│   └── screens # 页面
├── App.js # 入口文件
├── index.js # 入口文件
├── package.json # 依赖配置（不用管）
├── README.md # 项目说明
└── yarn.lock # 依赖版本锁定（不用管）
```


## 官方文档

- [React Native](https://reactnative.cn/docs/getting-started/)
- [React Navigation](https://reactnavigation.org/docs/getting-started/)
