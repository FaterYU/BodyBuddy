# BodyBuddy

![example workflow](https://github.com/FaterYU/BodyBuddy/actions/workflows/main_ci.yml/badge.svg)

**后端传送门**：[BodyBuddy_BackEnd](https://github.com/FaterYU/BodyBuddy_BackEnd)

## 项目进度

- [x] 项目初始化
- [x] Github Actions 配置
- [x] 社区页面
- [x] 登录注册页面
- [x] 课程页面
- [x] 日历页面
- [x] 个人页面
- [x] 训练评分页面
- [x] 后端接口
- [ ] 测试
- [ ] 登录Token
- [ ] 训练评分服务
- [ ] 课程发布
- [ ] 社群功能

## 文档

| 文档                         | 说明/链接                                                                                                                                                  |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 后端API文档                  | [BodyBuddy](https://documenter.getpostman.com/view/20262088/2s9Ykt6enz)                                                                                    |
| 代码规范                     | [JavaScript 规范](https://zh-google-styleguide.readthedocs.io/en/latest/google-javascript-styleguide/javascript_language_rules/#)                          |
| git commit/pull request 规范 | 使用**angular 规范**，已配置 [CI](./.github/workflows/main_ci.yml) 检查，不符合规范的提交会被拒绝                                                          |
| angular规范英文原件          | [angular (Github)](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)                                             |
| angular规范中文播客          | [Angular提交信息规范 (Git Guide)](https://zj-git-guide.readthedocs.io/zh-cn/latest/message/Angular%E6%8F%90%E4%BA%A4%E4%BF%A1%E6%81%AF%E8%A7%84%E8%8C%83/) |

## 依赖环境

- Node.js
- yarn
- Android Studio

## 快速启动

### 拉取代码

同时拉取子模块（后端），并进入项目根目录

```bash
git clone --recursive https://github.com/FaterYU/BodyBuddy.git
cd BodyBuddy
```

### 安装前端依赖

```bash
yarn
```

### 启动前端开发环境

```bash
yarn start
```

### 启动后端开发环境

参考文档 [BodyBuddy_BackEnd](https://github.com/FaterYU/BodyBuddy_BackEnd) 配置数据库并启动后端。
若在拉取代码时有添加 `--recursive` 参数，则后端代码已经在 `BodyBuddy/BACKEND` 目录下；若没有添加，则需要通过以下方式手动拉取后端代码。
  
  ```bash
  git submodule init
  git submodule update
  ```

  或将后端仓库直接克隆到指定的目录下
  
  ```bash
  cd /path/to/BodyBuddy_BackEnd
  git clone https://github.com/FaterYU/BodyBuddy_BackEnd.git
  ```

## 项目结构

```bash
├── .github # github 配置
├── BACKEND # 后端项目
├── android # Android 项目
├── ios # iOS 项目
├── src # 源代码
│   ├── assets # 静态资源
│   ├── components # 组件
│   ├── services # 服务
│   └── screens # 页面
├── App.js # 入口文件
├── index.js # 入口文件
├── package.json # 依赖配置
├── README.md # 项目说明
├── .gitignore # git 忽略文件
├── .editorconfig # 自动格式化配置
├── .pre-commit-config.yaml # pre-commit 配置
└── yarn.lock # 依赖版本锁定
```

## 快速分发

> 目前仅适配 Android，iOS 可分发但未测试

### Android

```bash
yarn release
```

## 官方文档

- [React Native](https://reactnative.cn/docs/getting-started/)
- [React Navigation](https://reactnavigation.org/docs/getting-started/)

## 开发者

### 前端

<a href="https://github.com/FaterYU/BodyBuddy/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=FaterYU/BodyBuddy" />
</a>

### 后端

<a href="https://github.com/FaterYU/BodyBuddy_BackEnd/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=FaterYU/BodyBuddy_BackEnd" />
</a>
