# 謝承翰 | Jamie — 個人形象網頁

單頁式個人形象網頁，用於求職展示，並可一鍵匯出排版良好的 PDF 履歷。

## 技術棧

- 原生 HTML + CSS + JavaScript（不使用任何前端框架，無需 build 步驟）
- PDF 匯出採用 `window.print()` + `@media print` 樣式，**不使用** html2canvas、jsPDF 等截圖式套件，確保匯出的 PDF 文字可複製、可被 ATS 系統掃描。

## 檔案結構

```
personal-website/
├── index.html
├── css/
│   ├── style.css        # 主樣式（含深淺色主題變數、響應式）
│   └── print.css        # 列印／PDF 專用樣式（含分頁控制）
├── js/
│   └── main.js           # 主題切換、捲動監聽、選單高亮、列印觸發
├── assets/
│   ├── photo.png          # 個人照片
│   └── projects/          # 專案截圖（選用）
└── README.md
```

## 本地預覽

直接以瀏覽器開啟 `index.html` 即可，無需啟動伺服器。

## 匯出 PDF 履歷

點擊側邊欄「匯出 PDF 履歷」按鈕，稍候片刻後會自動開啟瀏覽器列印視窗：

1. 「目的地」選擇「另存為 PDF」
2. 「邊界」保持預設值
3. 關閉「背景圖形」選項

## 部署（GitHub Pages）

1. 建立 repo（建議命名為 `jamie1002.github.io` 以使用根網域，或 `personal-website`）
2. 將本資料夾內容 push 至該 repo 的 `main` 分支
3. 於 repo 設定的 Pages 頁面，選擇從 `main` 分支根目錄部署
