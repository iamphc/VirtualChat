import { CharacterFormData } from "@/pages/CreateCharacter/CreateCharacter";

/**
 * 根据表单数据生成系统提示词
 * @param data 角色表单数据
 * @param t 翻译函数
 * @returns 格式化的系统提示词
 */
export const generateSystemPrompt = (
  data: CharacterFormData,
  t: Function
): string => {
  let prompt = data.systemPrompt || "";

  if (!prompt) {
    let basePrompt = `你是${data.name}`;

    // 添加性别
    const genderText = data.gender === "male" ? "男性" : "女性";
    basePrompt += `，一位${genderText}`;
    basePrompt += `。`;

    // 添加性格特点
    if (data.personalityTraits.length > 0) {
      basePrompt += `你的性格特点是${data.personalityTraits
        .map((trait) => t(`personalityTraits.${trait}`) || trait)
        .join("、")}。`;
    }

    // 添加思维和说话风格
    basePrompt += `你的思维风格是${
      t(`thinkingStyles.${data.thinkingStyle}`) || data.thinkingStyle
    }，`;
    basePrompt += `说话风格是${
      t(`toneStyles.${data.toneStyle}`) || data.toneStyle
    }。`;

    // 添加背景故事
    if (data.backgroundStory) {
      basePrompt += `\n\n背景故事：${data.backgroundStory}`;
    }

    prompt = basePrompt;
  }

  return prompt;
};

/**
 * 测试语音
 * @param voiceSettings 语音设置
 * @param text 要朗读的文本
 */
export const testVoice = (
  voiceEngine: string,
  voiceType: string,
  speakingRate: number,
  pitch: number,
  text: string
): void => {
  if (voiceEngine === "none" || !voiceType) return;

  // 如果采用Web Speech API
  if (window.speechSynthesis) {
    const utterance = new SpeechSynthesisUtterance(text);
    // 实际项目中，应当根据voiceType找到合适的voice
    utterance.rate = speakingRate;
    utterance.pitch = pitch;
    window.speechSynthesis.speak(utterance);
  } else {
    alert("您的浏览器不支持语音合成API");
  }
};

/**
 * 将文件转换为Base64字符串
 * @param file 文件对象
 * @returns Promise<string> Base64编码的字符串
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string);
      } else {
        reject(new Error("Failed to read file"));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};
