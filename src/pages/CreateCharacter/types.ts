export interface CharacterFormData {
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  avatar: string;
  avatarType: "emoji" | "image" | "generated";
  personalityTraits: string[];
  thinkingStyle: string;
  toneStyle: string;
  voiceEngine: "edge" | "local" | "none";
  voiceType: string;
  speakingRate: number;
  pitch: number;
  backgroundStory: string;
  systemPrompt: string;
  imageUrl?: string;
  characterType: string;
  imagePrompt?: string;
}

// 通用更新表单数据的类型，兼容所有步骤组件
export type UpdateFormDataFn = (field: string, value: any) => void;
