export default {
  app: {
    title: "Electron React App",
  },
  chat: {
    title: "채팅 도우미",
    placeholder: "메시지 입력...",
    send: "보내기",
    sending: "전송 중...",
    copy: "복사",
    copied: "복사됨",
    regenerate: "재생성",
    regenerating: "생성 중...",
    welcomeMessages: {
      assistant:
        "안녕하세요! 저는 당신의 로컬 AI 도우미입니다. 어떤 질문이나 문제가 있으시면 도와드리겠습니다. 오늘은 어떤 도움이 필요하신가요?",
      math: "안녕하세요! 저는 수학 개념 설명과 수학 문제 해결을 전문으로 하는 수학 튜터입니다. 수학에 도움이 필요하신가요?",
      fitness:
        "안녕하세요! 저는 건강한 식단과 운동 루틴에 대한 조언을 제공하는 피트니스 코치입니다. 피트니스 계획을 시작하거나 건강 질문이 있으신가요?",
      travel:
        "안녕하세요! 저는 여행지 추천, 일정 계획 및 여행 조언을 제공하는 여행 컨설턴트입니다. 어디로 여행을 계획하고 계신가요?",
    },
  },
  settings: {
    title: "사용자 설정",
    backToChat: "← 채팅으로 돌아가기",
    saved: "설정이 성공적으로 저장되었습니다!",
    userName: "사용자 이름",
    userNamePlaceholder: "사용자 이름 입력",
    avatar: "프로필 사진",
    changeAvatar: "아바타 변경",
    language: "언어",
    languageHint:
      "애플리케이션의 표시 언어를 설정합니다. 완전히 적용하려면 앱을 다시 시작해야 합니다.",
    theme: {
      title: "인터페이스 테마",
      light: "라이트",
      dark: "다크",
      system: "시스템",
    },
    notifications: {
      title: "알림 설정",
      desktop: "데스크톱 알림",
      sound: "메시지 소리",
    },
    ai: {
      title: "AI 모델 설정",
      selectModel: "모델 선택",
      localModelSettings: "로컬 모델 설정",
      localModelDirectory: "로컬 모델 디렉토리",
      browse: "찾아보기...",
      directoryHint: "로컬 LLM 모델 파일이 포함된 디렉토리 선택",
      selectLocalModel: "로컬 모델 선택",
      refresh: "새로고침",
      temperature: "온도",
      temperatureHint:
        "값이 낮을수록 응답이 더 집중적이고 결정적이며, 값이 높을수록 응답이 더 창의적이고 다양해집니다.",
      maxTokens: "최대 토큰 수",
      maxTokensHint: "생성된 응답의 최대 토큰 수(단어 조각)입니다.",
      streaming: "스트리밍 응답 활성화",
      streamingHint: "AI 응답 생성 과정(타이핑 효과)을 표시합니다.",
    },
    buttons: {
      save: "설정 저장",
      reset: "기본값으로 재설정",
      start: "모델 시작",
      stop: "모델 중지",
    },
    errors: {
      modelStartFailed: "모델 시작 실패: ",
    },
  },
  characters: {
    assistant: "도우미",
    mathTutor: "수학 튜터",
    fitnessCoach: "피트니스 코치",
    travelAdvisor: "여행 컨설턴트",
  },
};
