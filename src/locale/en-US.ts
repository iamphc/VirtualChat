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
      math: "Hello! I'm your math tutor, specialized in explaining mathematical concepts and solving math problems. Need help with math?",
      fitness:
        "Hi there! I'm your fitness coach, offering advice on healthy eating and exercise routines. Want to start a fitness plan or have health questions?",
      travel:
        "Hello! I'm your travel advisor, good at recommending destinations, planning itineraries, and providing travel advice. Planning to travel somewhere?",
      newCharacter:
        "Hello! I'm a new AI assistant, pleased to help you. How can I assist you today?",
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
    mathTutor: "Math Tutor",
    fitnessCoach: "Fitness Coach",
    travelAdvisor: "Travel Advisor",
    createNew: "Create New Character",
    name: "Character Name",
    avatar: "Choose Avatar",
    systemPrompt: "System Prompt",
    systemPromptPlaceholder:
      "Enter a prompt that defines this character's behavior and knowledge domain...",
    createWizard: {
      title: "Create New Character",
      previous: "Previous",
      next: "Next",
      create: "Create Character",
      steps: {
        1: {
          title: "Basic Information",
          description:
            "Set up the basic information for your character, including name, age, gender, and type.",
        },
        2: {
          title: "Character Appearance",
          description:
            "Choose or upload an avatar to represent your character.",
        },
        3: {
          title: "Character Personality",
          description:
            "Define the personality traits, thinking style, and tone of your character.",
        },
        4: {
          title: "Voice Settings",
          description:
            "Configure voice parameters for your character, including voice engine, voice type, and speaking rate.",
        },
        5: {
          title: "Background Story",
          description:
            "Add a background story and system prompt to enrich your character.",
        },
      },
      age: "Age",
      gender: "Gender",
      genderOptions: {
        male: "Male",
        female: "Female",
        other: "Other",
      },
      characterType: "Character Type",
      avatarType: "Avatar Type",
      avatarOptions: {
        emoji: "Emoji",
        upload: "Upload Image",
        generate: "Generate Image",
      },
      uploadImage: "Upload Image",
      imagePrompt: "Image Generation Prompt",
      imagePromptPlaceholder:
        "Describe the character appearance you want to generate",
      generationDisclaimer:
        "Note: Image generation requires connection to an AI image generation service.",
      personalityTraits: "Personality Traits",
      selectMultiple: "You can select multiple personality traits",
      thinkingStyle: "Thinking Style",
      toneStyle: "Communication Tone",
      voiceEngine: "Voice Engine",
      voiceEngines: {
        none: "None (No Voice)",
        edge: "Edge TTS",
        local: "Local Voice",
      },
      voiceType: "Voice Type",
      selectVoice: "Please select a voice",
      chineseVoices: "Chinese Voices",
      englishVoices: "English Voices",
      speakingRate: "Speaking Rate",
      slow: "Slow",
      normal: "Normal",
      fast: "Fast",
      pitch: "Pitch",
      low: "Low",
      medium: "Medium",
      high: "High",
      testVoice: "Test Voice",
      backgroundStory: "Background Story",
      backgroundStoryPlaceholder:
        "Describe the background story, experiences, or unique characteristics of this character...",
      customizePrompt:
        "You can customize the system prompt, or leave it blank to use the auto-generated prompt",
      promptPreview: "System Prompt Preview",
      promptPreviewHint:
        "This is the system prompt that will be used for your character, guiding how the AI will roleplay",
    },
  },
  common: {
    save: "Save",
    cancel: "Cancel",
    generate: "Generate",
    generating: "Generating...",
    image: "Image",
    generateImage: "Generate Image",
    imagePrompt: "Image Description",
    imagePromptPlaceholder: "Describe the image you want to generate...",
    addImage: "Add Image",
    close: "Close",
    generationError: "Generation failed, please try again",
  },
  characterTypes: {
    assistant: "AI Assistant",
    tutor: "Educational Tutor",
    friend: "Virtual Friend",
    expert: "Professional Expert",
    roleplay: "Roleplay Character",
  },
  personalityTraits: {
    friendly: "Friendly",
    serious: "Serious",
    humorous: "Humorous",
    professional: "Professional",
    creative: "Creative",
    analytical: "Analytical",
    empathetic: "Empathetic",
    curious: "Curious",
    patient: "Patient",
    adventurous: "Adventurous",
  },
  thinkingStyles: {
    concise: "Concise",
    academic: "Academic",
    inquiring: "Inquiring",
    philosophical: "Philosophical",
    balanced: "Balanced",
  },
  toneStyles: {
    friendly: "Friendly",
    formal: "Formal",
    casual: "Casual",
    professional: "Professional",
    enthusiastic: "Enthusiastic",
  },
};
