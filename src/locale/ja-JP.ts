export default {
  app: {
    title: "Electron React App",
  },
  chat: {
    title: "チャットアシスタント",
    placeholder: "メッセージを入力...",
    send: "送信",
    sending: "送信中...",
    copy: "コピー",
    copied: "コピー済み",
    regenerate: "再生成",
    regenerating: "生成中...",
    welcomeMessages: {
      assistant:
        "こんにちは！私はあなたのローカルAIアシスタントです。どんな質問や問題でもお手伝いします。今日は何をお手伝いできますか？",
      math: "こんにちは！数学の概念を説明したり、数学の問題を解決するのを専門とする数学チューターです。数学でお困りですか？",
      fitness:
        "こんにちは！健康的な食事と運動のアドバイスを提供するフィットネスコーチです。フィットネスプランを始めたいですか？それとも健康に関する質問がありますか？",
      travel:
        "こんにちは！目的地の推薦、旅程の計画、旅行のアドバイスを提供する旅行アドバイザーです。どこかに旅行する予定はありますか？",
    },
  },
  settings: {
    title: "ユーザー設定",
    backToChat: "← チャットに戻る",
    saved: "設定が正常に保存されました！",
    userName: "ユーザー名",
    userNamePlaceholder: "ユーザー名を入力",
    avatar: "プロフィール画像",
    changeAvatar: "アバターを変更",
    language: "言語",
    languageHint:
      "アプリケーションの表示言語を設定します。完全に有効にするにはアプリの再起動が必要です。",
    theme: {
      title: "インターフェーステーマ",
      light: "ライト",
      dark: "ダーク",
      system: "システム",
    },
    notifications: {
      title: "通知設定",
      desktop: "デスクトップ通知",
      sound: "メッセージ音",
    },
    ai: {
      title: "AIモデル設定",
      selectModel: "モデルを選択",
      localModelSettings: "ローカルモデル設定",
      localModelDirectory: "ローカルモデルディレクトリ",
      browse: "ブラウズ...",
      directoryHint: "ローカルLLMモデルファイルを含むディレクトリを選択",
      selectLocalModel: "ローカルモデルを選択",
      refresh: "更新",
      temperature: "温度",
      temperatureHint:
        "値が低いほど応答は的確で決定的に、値が高いほど応答は創造的で多様になります。",
      maxTokens: "最大トークン数",
      maxTokensHint: "生成される応答の最大トークン数（単語の断片）。",
      streaming: "ストリーミングレスポンスを有効にする",
      streamingHint: "AI応答生成プロセス（タイピング効果）を表示します。",
    },
    buttons: {
      save: "設定を保存",
      reset: "デフォルトにリセット",
      start: "モデルを開始",
      stop: "モデルを停止",
    },
    errors: {
      modelStartFailed: "モデルの起動に失敗しました: ",
    },
  },
  characters: {
    assistant: "アシスタント",
    mathTutor: "数学チューター",
    fitnessCoach: "フィットネスコーチ",
    travelAdvisor: "旅行アドバイザー",
  },
};
