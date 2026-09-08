# 🧠 AI Memory Bot

**Personal AI with unlimited memory storage**

[![PWA](https://img.shields.io/badge/PWA-Installable-blue)](https://yourusername.github.io/ai-memory-bot)
[![Telegram](https://img.shields.io/badge/Telegram-Storage-blue)](https://telegram.org)

## ✨ Features

- 🤖 **AI-Powered** - Chat with advanced AI
- 💾 **Unlimited Storage** - Telegram channel as cloud storage
- 📁 **File Management** - Upload, download, delete files
- 🔒 **Encrypted** - Your data is private and secure
- 📱 **PWA Ready** - Install on any device
- 🧠 **Learning AI** - Remembers previous conversations
- 🎨 **ChatGPT Style UI** - Clean and modern
- 📝 **Rich Text** - Bold, italic, tables, code blocks
- 🔄 **Smart Search** - AI finds files by name or content

## 🚀 Live Demo

[Click here to try it](https://yourusername.github.io/ai-memory-bot)

## 📱 Install as PWA

### On Mobile (Android/Chrome)
1. Open the app in Chrome
2. Tap the "Install App" button
3. Click "Install"

### On iOS (Safari)
1. Open the app in Safari
2. Tap the Share button
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add"

### On Desktop (Chrome/Edge)
1. Open the app
2. Click the install icon in the address bar
3. Click "Install"

## 🎯 How to Use

### Chat
- Type your message and press Enter
- AI remembers everything you say
- AI learns from previous conversations

### Files
- Click 📎 to upload files
- Drag & drop files anywhere
- Text files: AI can read and remember
- Binary files: Download only
- "Give me [filename]" → Download file
- "Show my files" → List all files
- "Delete [filename]" → Remove file

### Shortcuts
- `Ctrl+L` or `⌘+L` → Focus input
- `Ctrl+R` or `⌘+R` → Refresh data
- Swipe left → Delete from chat
- Swipe right → Delete permanently

## 📁 File Structure

```

ai-memory-bot/
├── index.html          # Main application
├── manifest.json       # PWA manifest
├── sw.js              # Service Worker
├── 404.html           # Error page
└── README.md          # Documentation

```

## 🛠️ Tech Stack

- **Puter.js** - AI and cloud storage
- **Telegram API** - Unlimited storage backend
- **PWA** - Installable web app
- **HTML/CSS/JS** - Frontend

## 🔧 Configuration

Edit the `CONFIG` object in `index.html`:

```javascript
const CONFIG = {
    telegram: {
        channelId: '-1003953146702',
        botToken: 'YOUR_BOT_TOKEN'
    },
    textExtensions: ['txt', 'json', 'csv', 'md', ...]
};
```

🔐 Privacy

· All data is encrypted before storage
· Only the AI can decrypt your memories
· Your data is stored in your own Telegram channel
· No third-party access to your data

🚀 Deployment

GitHub Pages

1. Create a repository
2. Upload all files
3. Enable GitHub Pages
4. Your app is live!

Netlify

1. Drag and drop the folder
2. Deploy instantly

📝 License

MIT

🙏 Credits

· Icon by Flaticon
· AI by Puter.js
· Storage by Telegram

```
