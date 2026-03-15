macOS 默认应用 Deep Link Scheme（应用名称 deeplink_url）整理如下：

- Finder	file://
- 系统偏好设置	x-apple.systempreferences:
- 终端	terminal://
- 计算器	calculator://
- 邮件	mailto:
- 信息	imessage:
- FaceTime	facetime:
- FaceTime 音频	facetime-audio:
- Safari HTTP	x-safari-http:
- Safari HTTPS	x-safari-https:
- Safari 搜索	x-web-search:
- 音乐	music://
- 播客	podcasts://
- 电视	tv://
- 地图	maps://
- 日历	webcal://
- 提醒事项	x-apple-reminder://
- 备忘录	notes://
- 词典	dict://
- 字体册	fontbook://
- 微信	xweixin://,weixin://,wechat://
- QQ	tencent://,mqq://,mqqapi://
- 钉钉	dingtalk://
- 飞书	lark://,feishu://,feishu-open://,x-feishu://
- 阿里旺旺	aliim://
- 网易云音乐	orpheus://
- 腾讯会议	wemeet://,wemeet3://,wwauth3rdca2b0d866939bfde://,wwauth3rd3a82ac41e00d815d://,wwauth3rd4806d2ddf553eb8b://,wwauth3rd3a24940e95296ca3://,wwauth3rdd5968e076e21ca07://
- 企业微信	wxwork://
- 腾讯文档	txdocs://
- WPS	wps://
- 百度网盘	baiduyun://
- 迅雷	thunder://
- QQ音乐	qqmusic://,qqmusicmac://
- 优酷	youku://
- 爱奇艺	iqiyi://
- 哔哩哔哩	bilibili://
- 腾讯视频	tenvideo://
- 金山文档	kdocs://
- 石墨文档	shimo://
- 语雀	yuque://
- Visual Studio Code	vscode://,code://
- Typora	typora://
- iTerm	iterm2://,gopher://,telnet://,gemini://,titan://,whois://,x-man-page://
- Alfred	alfred://
- Xcode	xcode://,xcdevice://,xcdoc://,apple-reference-documentation://,x-xcode-documentation://,doc://,interface-builder://
- Postman	postman://
- Arc	arcBrowser://
- Binance	binance://
- Clash Verge	clash://,clash-verge://
- Cursor	cursor://
- Discord	discord://
- Docker	docker-desktop://
- Doubao	doubao://
- Gifski	gifski://
- HBuilderX	hbuilderx://
- LarkSuite	lark://,feishu://,feishu-open://,x-lark://
- Microsoft Edge	microsoft-edge://
- Microsoft Excel	launch-excel://,open-excel://,ms-excel://,excel://
- Notion	notion://
- OpenClaw	openclaw://
- OrbStack	orbstack://
- PrettyClean	prettyclean://
- Quark	qklink://,qkclouddrive://,magnet://
- Reqable	com.googleusercontent.apps.716983111520-85qgdtuvltaeinf75o92s12ak3j8udo1://
- Safari	x-safari-https://,prefs://,x-webkit-app-launch://
- ServBay	servbay://
- Telegram Lite	tg://,tonsite://
- Trae CN	trae-cn://
- Typeless	typeless://
- VideoFusion-macOS	vega://,videocut://
- Warp	warp://
- Whisper Transcription	macwhisper://
- Wispr Flow	wispr-flow://
- XMind	xmind://,xmind-zen://
- i4Tools	PCi4Tools://,i4://
- uTools	utools://
- wechatwebdevtools	wechatide://
- wpsoffice	ksoqing://,ksoapp://,ksodoccenter://,ksowpscloudsvr://,ksowps://,ksowpp://,ksoet://,ksopdf://
- 元宝	yuanbao://,yuanbao2://
- 语雀	yuque://

---

## 🌍 国外常用 Mac App（Deeplink 参考）

以下为国外常用 Mac 应用及对应 URL Scheme，便于在 LaunchPad 或网页中一键打开：

| 应用 | Deeplink | 说明 |
|------|----------|------|
| **Figma** | `figma://` | 设计协作，桌面版打开 Figma 链接需在偏好中开启「在桌面应用中打开链接」 |
| **Slack** | `slack://`、`slack://open` | 团队沟通；可带 `slack://channel?team=...&id=...` 打开指定频道 |
| **Zoom** | `zoomus://`、`zoommtg://` | 视频会议；会议链接会重定向到 `zoommtg://` 唤起客户端 |
| **Spotify** | `spotify://` | 音乐流媒体；支持 `spotify:track:...`、`spotify:album:...` 等 |
| **Notion** | `notion://` | 笔记/知识库；将页面链接的 `https://` 改为 `notion://` 可在桌面版打开 |
| **Discord** | `discord://` | 社区/语音聊天 |
| **Trello** | `trello://` | 看板任务；支持 x-callback-url，如 `trello://x-callback-url/showBoard?shortlink=...` |
| **Google Chrome** | `googlechrome://` | 浏览器；也可用 `googlechrome://` + URL 在 Chrome 中打开网页 |
| **1Password** | `onepassword://` | 密码管理；可用 `onepassword://view-item/...` 打开具体条目 |
| **Dropbox** | `dropbox://` | 云盘同步 |
| **Microsoft Teams** | `msteams://` | 会议与协作（若已安装桌面版） |

**参考来源**：各应用官方文档、[macOS URL Schemes (GitHub)](https://github.com/SKaplanOfficial/macOS-URL-Schemes-for-macOS-Applications)、[Slack Deep linking](https://api.slack.com/reference/deep-linking)、[Figma Desktop 设置](https://help.figma.com/hc/en-us/articles/22850791655831)。

---

## 🧩 代码示例

### 1. 在网页中添加打开链接
```html
<a href="weixin://" onclick="openApp(event, 'weixin://', 'https://apps.apple.com/app/wechat/id414478124')">打开微信</a>
<a href="dingtalk://" onclick="openApp(event, 'dingtalk://', 'https://apps.apple.com/app/钉钉/id930368978')">打开钉钉</a>

<script>
function openApp(event, scheme, fallbackUrl) {
    event.preventDefault();
    
    // 尝试打开 App
    window.location.href = scheme;
    
    // 如果 2 秒后还在当前页面，则跳转到下载页
    setTimeout(() => {
        if (document.hasFocus()) {
            window.location.href = fallbackUrl;
        }
    }, 2000);
}
</script>
```

### 2. 检测应用是否已安装
```javascript
function isAppInstalled(scheme) {
    return new Promise((resolve) => {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = scheme;
        
        iframe.onload = () => {
            document.body.removeChild(iframe);
            resolve(true); // App 已安装
        };
        
        iframe.onerror = () => {
            document.body.removeChild(iframe);
            resolve(false); // App 未安装
        };
        
        document.body.appendChild(iframe);
        
        // 超时处理
        setTimeout(() => {
            document.body.removeChild(iframe);
            resolve(false);
        }, 1000);
    });
}

// 使用示例
isAppInstalled('weixin://').then((installed) => {
    console.log('微信已安装:', installed);
});
```

---

## ⚠️ 重要注意事项

1. **安全限制**：macOS 的 Safari/Chrome 会阻止自动跳转，必须由**用户点击**触发
2. **协议未注册**：如果应用未安装，会显示 `net::ERR_UNKNOWN_URL_SCHEME`
3. **应用版本**：某些 Deep Link 功能需要特定版本的应用支持
4. **权限提示**：首次通过网页打开应用时，系统会询问用户是否允许
5. **备用方案**：一定要提供下载链接，方便用户下载未安装的应用

