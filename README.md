# 企业微信聊天机器人

基于 GitHub + Vercel 构建的企业微信聊天机器人，无需本地配置，完全云端部署。

## 功能特点

- ✅ 完全云端部署，无需本地配置
- ✅ 支持企业微信官方 API
- ✅ 自动部署到 Vercel
- ✅ 支持文本消息处理
- ✅ 可扩展的插件系统

## 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/your-username/wechat-bot.git
cd wechat-bot
```

### 2. 部署到 Vercel

1. 访问 [Vercel](https://vercel.com/)
2. 点击 "New Project"
3. 选择你的 GitHub 仓库
4. 点击 "Deploy"

### 3. 配置企业微信

1. 登录 [企业微信管理后台](https://work.weixin.qq.com/)
2. 创建一个应用
3. 在 "应用信息" 中获取 CorpID 和 AgentID
4. 在 "权限管理" 中设置相关权限
5. 在 "接收消息" 中配置回调 URL：`https://your-vercel-domain.vercel.app/api/webhook`
6. 生成并保存 Secret

### 4. 配置环境变量

在 Vercel 项目的 "Settings" -> "Environment Variables" 中添加：

- `CORP_ID`: 企业微信 CorpID
- `AGENT_ID`: 应用 AgentID
- `APP_SECRET`: 应用 Secret

### 5. 测试机器人

在企业微信中向机器人发送消息，机器人会自动回复。

## 扩展功能

### 添加新的消息处理器

在 `src/handlers/` 目录中添加新的处理器文件，然后在 `src/bot.js` 中注册。

### 集成 AI 能力

可以集成 OpenAI、百度文心一言等 AI 服务，实现智能回复。

## 技术栈

- Node.js
- Express
- Vercel Serverless Functions
- 企业微信 API

## 许可证

MIT
