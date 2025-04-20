import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import useChat from "@/pages/Chat/useChat";
import { generateSystemPrompt } from "@/utils/characterUtils";
import {
  CharacterFormData,
  UpdateFormDataFn,
} from "@/pages/CreateCharacter/types";

const STORAGE_KEY = "character_creation_data";

const initialFormData: CharacterFormData = {
  name: "",
  gender: "male",
  avatar: "🤖",
  avatarType: "emoji",
  personalityTraits: [],
  thinkingStyle: "balanced",
  toneStyle: "friendly",
  voiceEngine: "none",
  voiceType: "",
  speakingRate: 1,
  pitch: 1,
  backgroundStory: "",
  systemPrompt: "",
  characterType: "assistant",
  age: 30,
};

// 从本地存储中获取保存的数据
const getSavedData = (): {
  formData: CharacterFormData;
  step: number;
} | null => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error("获取保存的角色创建数据失败", error);
  }
  return null;
};

// 计算用户已完成的最远步骤
const calculateFurthestStep = (formData: CharacterFormData): number => {
  // 检查第5步 - 背景故事是可选的，但如果已填写，则认为第5步完成
  if (formData.backgroundStory.trim() !== "") {
    return 5;
  }

  // 检查第4步 - 语音设置
  if (formData.voiceEngine !== "none" && formData.voiceType !== "") {
    return 4;
  } else if (formData.voiceEngine === "none") {
    // 如果用户选择了不使用语音，也认为第4步完成
    return 4;
  }

  // 检查第3步 - 性格特征
  if (formData.personalityTraits.length > 0) {
    return 3;
  }

  // 检查第2步 - 头像设置
  if (
    (formData.avatarType === "emoji" && formData.avatar !== "") ||
    (formData.avatarType === "image" && formData.imageUrl)
  ) {
    return 2;
  }

  // 检查第1步 - 基本信息
  if (formData.name.trim() !== "") {
    return 1;
  }

  return 1; // 默认从第1步开始
};

// 保存数据到本地存储
const saveData = (formData: CharacterFormData, step: number): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ formData, step }));
  } catch (error) {
    console.error("保存角色创建数据失败", error);
  }
};

// 清除保存的数据
const clearSavedData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("清除保存的角色创建数据失败", error);
  }
};

export function useCreateCharacter() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { addCharacter } = useChat();

  // 从本地存储中获取数据
  const savedData = getSavedData();

  // 如果有保存的数据，计算用户已完成的最远步骤
  const furthestStep = savedData?.formData
    ? calculateFurthestStep(savedData.formData)
    : 1;

  // 使用计算出的最远步骤作为初始步骤，除非保存的步骤更大
  const initialStep =
    savedData?.step && savedData.step > furthestStep
      ? savedData.step
      : furthestStep;

  const [currentStep, setCurrentStep] = useState(initialStep);
  const [formData, setFormData] = useState<CharacterFormData>(
    savedData?.formData || initialFormData
  );
  const [validationError, setValidationError] = useState<string | null>(null);

  const totalSteps = 5;

  // 当表单数据或当前步骤变化时，保存到本地存储
  useEffect(() => {
    saveData(formData, currentStep);
  }, [formData, currentStep]);

  const validateCurrentStep = (): boolean => {
    // 重置验证错误
    setValidationError(null);

    // 验证各个步骤必填字段
    switch (currentStep) {
      case 1: // 基本信息
        if (!formData.name.trim()) {
          setValidationError("请输入角色名称");
          return false;
        }
        break;
      case 2: // 头像设置
        // 头像步骤的验证逻辑，如果有必填项
        if (formData.avatarType === "image" && !formData.imageUrl) {
          setValidationError("请上传角色头像图片");
          return false;
        }
        break;
      case 3: // 性格特征
        if (formData.personalityTraits.length === 0) {
          setValidationError("请至少选择一个性格特点");
          return false;
        }
        break;
      case 4: // 语音设置
        // 如果选择了语音引擎但未选择具体语音类型
        if (formData.voiceEngine !== "none" && !formData.voiceType) {
          setValidationError("请选择语音类型");
          return false;
        }
        break;
      case 5: // 背景故事
        // 背景故事可以选填，不进行验证
        break;
    }

    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // 切换到前一步时清除验证错误
      setValidationError(null);
    }
  };

  const updateFormData: UpdateFormDataFn = (field, value): void => {
    setFormData({
      ...formData,
      [field]: value,
    });
    // 当用户输入时清除验证错误
    setValidationError(null);
  };

  const handleSubmit = () => {
    // 提交前验证最后一步
    if (!validateCurrentStep()) {
      return;
    }

    // 根据表单数据生成系统提示词
    const completeSystemPrompt = generateSystemPrompt(formData, t);

    // 创建角色对象
    const newCharacter = {
      name: formData.name,
      avatar: formData.avatarType === "emoji" ? formData.avatar : "👤", // 如果不是emoji则使用默认头像
      systemPrompt: completeSystemPrompt,
      age: formData.age,
      gender: formData.gender,
      imageUrl: formData.imageUrl,
      personalityTraits: formData.personalityTraits,
      thinkingStyle: formData.thinkingStyle,
      toneStyle: formData.toneStyle,
      backgroundStory: formData.backgroundStory,
      voiceSettings: {
        engine: formData.voiceEngine,
        type: formData.voiceType,
        rate: formData.speakingRate,
        pitch: formData.pitch,
      },
    };

    // 创建角色成功后清除本地存储的数据
    clearSavedData();

    addCharacter(newCharacter);
    navigate("/"); // 创建完成后返回聊天页面
  };

  const goToHome = () => {
    navigate("/");
  };

  return {
    currentStep,
    totalSteps,
    formData,
    validationError,
    setCurrentStep,
    handleNext,
    handlePrevious,
    updateFormData,
    handleSubmit,
    goToHome,
  };
}
