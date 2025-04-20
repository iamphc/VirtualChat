export default {
  app: {
    title: "Electron React App",
    sidebar: {
      expand: "Expand Sidebar",
      collapse: "Collapse Sidebar",
    },
  },
  chat: {
    title: "Chat Assistant",
    placeholder: "Type a message...",
    send: "Send",
    sending: "Sending...",
    copy: "Copy",
    copied: "Copied",
    regenerate: "Regenerate",
    regenerating: "Regenerating...",
    welcomeMessages: {
      assistant:
        "Hello! I'm your local AI assistant. I'm here to help you with any questions or problems you might have. What can I help you with today?",
      math: "Hello! I'm your math tutor, specialised in explaining mathematical concepts and solving maths problems. Need help with maths?",
      fitness:
        "Hi there! I'm your fitness coach, offering advice on healthy eating and exercise routines. Want to start a fitness plan or have health questions?",
      travel:
        "Hello! I'm your travel advisor, good at recommending destinations, planning itineraries, and providing travel advice. Planning to travel somewhere?",
    },
  },
  settings: {
    title: "User Settings",
    backToChat: "← Back to Chat",
    saved: "Settings updated successfully!",
    userName: "Username",
    userNamePlaceholder: "Enter your username",
    avatar: "Profile Picture",
    changeAvatar: "Change Avatar",
    language: "Language",
    languageHint:
      "Set the display language for the application. Changes take effect immediately.",
    theme: {
      title: "Interface Theme",
      light: "Light",
      dark: "Dark",
      system: "System",
    },
    notifications: {
      title: "Notification Settings",
      desktop: "Desktop Notifications",
      sound: "Message Sound",
    },
    ai: {
      title: "AI Model Settings",
      selectModel: "Select Model",
      localModelSettings: "Local Model Settings",
      localModelDirectory: "Local Model Directory",
      browse: "Browse...",
      directoryHint:
        "Select the directory containing your local LLM model files",
      selectLocalModel: "Select Local Model",
      refresh: "Refresh",
      temperature: "Temperature",
      temperatureHint:
        "Lower values make responses more focused and deterministic, higher values make responses more creative and varied.",
      maxTokens: "Max Tokens",
      maxTokensHint:
        "Maximum number of tokens (pieces of words) for generated responses.",
      streaming: "Enable Streaming Response",
      streamingHint: "Show the AI response generation process (typing effect).",
    },
    buttons: {
      save: "Save Settings",
      reset: "Reset to Default",
      start: "Start Model",
      stop: "Stop Model",
    },
    errors: {
      modelStartFailed: "Failed to start model: ",
    },
  },
  characters: {
    assistant: "Assistant",
    mathTutor: "Maths Tutor",
    fitnessCoach: "Fitness Coach",
    travelAdvisor: "Travel Advisor",
  },
};
