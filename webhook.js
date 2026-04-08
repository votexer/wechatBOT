const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// 从环境变量获取配置
const CORP_ID = process.env.CORP_ID;
const AGENT_ID = process.env.AGENT_ID;
const APP_SECRET = process.env.APP_SECRET;
const TOKEN = process.env.TOKEN || 'wechat-bot-token';

// 企业微信消息验证
app.get('/api/webhook', (req, res) => {
  const { msg_signature, timestamp, nonce, echostr } = req.query;
  
  // 验证签名
  const signature = crypto.createHash('sha1')
    .update([TOKEN, timestamp, nonce].sort().join(''))
    .digest('hex');
  
  if (signature === msg_signature) {
    res.send(echostr);
  } else {
    res.status(401).send('Invalid signature');
  }
});

// 处理企业微信消息
app.post('/api/webhook', async (req, res) => {
  try {
    const { msgtype, text, sender, chatid } = req.body;
    
    console.log('收到消息:', req.body);
    
    // 处理文本消息
    if (msgtype === 'text') {
      const content = text.content.trim();
      let reply = '';
      
      // 简单的回复逻辑
      if (content.includes('你好') || content.includes('Hello')) {
        reply = '你好！我是企业微信机器人，有什么可以帮您的吗？';
      } else if (content.includes('天气')) {
        reply = '今天天气晴朗，温度适宜，祝您心情愉快！';
      } else if (content.includes('时间')) {
        reply = `当前时间：${new Date().toLocaleString()}`;
      } else if (content.includes('帮助') || content.includes('help')) {
        reply = '我可以帮您：\n1. 问好\n2. 查看天气\n3. 查看时间\n4. 更多功能开发中...';
      } else {
        reply = `收到您的消息：${content}\n\n我正在学习中，敬请期待更多功能！`;
      }
      
      // 回复消息
      await sendMessage(sender, reply);
    }
    
    // 回复空字符串表示已处理
    res.send('');
  } catch (error) {
    console.error('处理消息失败:', error);
    res.status(500).send('Internal server error');
  }
});

// 发送消息到企业微信
async function sendMessage(toUser, content) {
  try {
    // 获取 access_token
    const tokenResponse = await axios.get(
      `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${CORP_ID}&corpsecret=${APP_SECRET}`
    );
    
    const accessToken = tokenResponse.data.access_token;
    
    // 发送消息
    await axios.post(
      `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${accessToken}`,
      {
        touser: toUser,
        agentid: AGENT_ID,
        msgtype: 'text',
        text: {
          content: content
        }
      }
    );
    
    console.log('消息发送成功');
  } catch (error) {
    console.error('发送消息失败:', error);
  }
}

module.exports = app;
