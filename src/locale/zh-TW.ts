export default {
  app: {
    title: "Electron React App",
    sidebar: {
      expand: "展開側邊欄",
      collapse: "收起側邊欄",
    },
  },
  chat: {
    title: "聊天助手",
    placeholder: "輸入訊息...",
    send: "發送",
    sending: "發送中...",
    copy: "複製",
    copied: "已複製",
    regenerate: "重新生成",
    regenerating: "生成中...",
    welcomeMessages: {
      assistant:
        "你好！我是你的本地智能助手，我樂於幫助你解決各種問題。請問今天有什麼我可以幫助你的嗎？",
      math: "你好！我是你的數學導師，擅長解釋數學概念和解答數學問題。需要數學方面的幫助嗎？",
      fitness:
        "嗨！我是你的健身教練，可以為你提供健康飲食和鍛煉建議。想要開始健身計劃或有健康問題需要諮詢嗎？",
      travel:
        "你好！我是你的旅遊顧問，擅長推薦旅遊目的地、規劃行程和提供旅行建議。計劃去哪裡旅行嗎？",
    },
  },
  settings: {
    title: "用戶設置",
    backToChat: "← 返回聊天",
    saved: "設置已更新成功！",
    userName: "用戶名稱",
    userNamePlaceholder: "請輸入用戶名稱",
    avatar: "個人頭像",
    changeAvatar: "更改頭像",
    language: "語言偏好",
    languageHint: "設置應用界面顯示的語言。修改後將立即生效。",
    theme: {
      title: "界面主題",
      light: "淺色",
      dark: "深色",
      system: "系統",
    },
    notifications: {
      title: "通知設置",
      desktop: "桌面通知",
      sound: "訊息提示音",
    },
    ai: {
      title: "大模型設置",
      selectModel: "選擇模型",
      localModelSettings: "本地模型設置",
      localModelDirectory: "本地模型目錄",
      browse: "瀏覽...",
      directoryHint: "選擇存放本地LLM模型文件的目錄",
      selectLocalModel: "選擇本地模型",
      refresh: "刷新",
      temperature: "溫度",
      temperatureHint:
        "較低的值使回答更加集中和確定性，較高的值使回答更有創意和多樣性。",
      maxTokens: "最大令牌數",
      maxTokensHint: "生成回答時的最大令牌數（單詞/詞語的部分）。",
      streaming: "啟用流式響應",
      streamingHint: "顯示AI回答生成過程（打字效果）。",
    },
    buttons: {
      save: "保存設置",
      reset: "恢復默認",
      start: "啟動模型",
      stop: "停止模型",
    },
    errors: {
      modelStartFailed: "啟動模型失敗: ",
    },
  },
  characters: {
    assistant: "小助手",
    mathTutor: "數學導師",
    fitnessCoach: "健身教練",
    travelAdvisor: "旅遊顧問",
  },
};
