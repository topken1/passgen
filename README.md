# 密碼產生器 (Password Generator)

A secure and user-friendly password generator built with vanilla JavaScript.

![Password Generator Screenshot](https://github.com/user-attachments/assets/3b0aafb3-7f72-4331-ace8-b884e4c8aa2e)

## 功能特色 (Features)

- 🔐 **安全的密碼生成** - 使用加密安全的隨機數生成器
- 📏 **自定義長度** - 支援 4-50 字元長度的密碼
- 🔤 **多種字元類型支援**:
  - 大寫字母 (A-Z)
  - 小寫字母 (a-z) 
  - 數字 (0-9)
  - 特殊符號 (!@#$%^&*)
- 💪 **密碼強度指示器** - 即時顯示密碼強度
- 📋 **一鍵複製** - 快速複製密碼到剪貼簿
- 📱 **響應式設計** - 支援桌面和行動裝置
- 🌏 **中英雙語介面** - 支援繁體中文和英文

## 使用方法 (How to Use)

1. 調整密碼長度滑桿選擇所需長度
2. 勾選要包含的字元類型
3. 點擊「🎲 產生密碼」按鈕
4. 點擊「📋」按鈕複製密碼
5. 使用「🗑️ 清除」按鈕清空密碼

## 本地運行 (Local Development)

1. 克隆此專案:
```bash
git clone https://github.com/topken1/passgen.git
cd passgen
```

2. 安裝依賴:
```bash
npm install
```

3. 啟動開發伺服器:
```bash
npm run serve
```

4. 在瀏覽器中打開 http://localhost:3000

## 檔案結構 (File Structure)

```
passgen/
├── index.html      # 主要 HTML 文件
├── app.js          # JavaScript 應用程式邏輯  
├── style.css       # CSS 樣式
├── package.json    # Node.js 專案配置
└── README.md       # 專案說明文件
```

## 技術實現 (Technical Implementation)

- **純 JavaScript** - 無需外部框架依賴
- **現代 CSS** - 使用 Flexbox 和 Grid 布局
- **漸進式增強** - 支援舊版瀏覽器的後備方案
- **安全性考量** - 確保每種字元類型至少包含一個字元
- **密碼強度演算法** - 基於長度和字元多樣性的評分系統

## 瀏覽器相容性 (Browser Compatibility)

- Chrome 60+
- Firefox 55+  
- Safari 11+
- Edge 79+

## 授權 (License)

MIT License - 詳見 LICENSE 檔案

## 貢獻 (Contributing)

歡迎提交 Issues 和 Pull Requests 來改善這個專案！
