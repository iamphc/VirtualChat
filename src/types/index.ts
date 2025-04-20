// 聊天消息类型
export interface Message {
  id: number;
  text: string;
  isUser: boolean;
  role?: "system" | "user" | "assistant";
  content?: string;
}

// 语音设置类型
export interface VoiceSettings {
  engine: "edge" | "local" | "none";
  type: string;
  rate: number;
  pitch: number;
}

// 虚拟角色类型
export interface VirtualCharacter {
  id: number;
  name: string;
  avatar: string;
  isActive: boolean;
  systemPrompt?: string;
  age?: number;
  gender?: "male" | "female" | "other";
  characterType?: string;
  imageUrl?: string;
  personalityTraits?: string[];
  thinkingStyle?: string;
  toneStyle?: string;
  voiceSettings?: VoiceSettings;
  backgroundStory?: string;
}

// AI模型类型
export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description?: string;
}

// 本地模型类型
export interface LocalModel {
  id: string;
  name: string;
  path: string;
}

// 文本模型设置类型
export interface TextModelSettings {
  model: string;
  apiKey: string;
  temperature: number;
  maxTokens: number;
  streamingEnabled: boolean;
  localModelPath: string;
  selectedLocalModel: string;
}

// 语音模型设置类型
export interface VoiceModelSettings {
  model: string;
  apiKey: string;
  quality: "standard" | "high";
  speakingRate: number;
  pitch: number;
}

// 图像生成模型设置类型
export interface ImageModelSettings {
  model: string;
  apiKey: string;
  resolution: "256x256" | "512x512" | "1024x1024";
  quality: "standard" | "hd";
  style: "natural" | "vivid";
}

// 用户设置类型
export interface UserSettings {
  userName: string;
  language: string;
  theme: "light" | "dark" | "system";
  notifications: {
    desktop: boolean;
    sound: boolean;
    volume?: number;
  };
  textModelSettings: TextModelSettings;
  voiceModelSettings: VoiceModelSettings;
  imageModelSettings: ImageModelSettings;
}
