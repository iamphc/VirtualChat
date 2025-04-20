import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { VirtualCharacter } from "@/types";

// 步骤组件导入
import BasicInfoStep from "./wizard-steps/BasicInfoStep";
import AvatarStep from "./wizard-steps/AvatarStep";
import PersonalityStep from "./wizard-steps/PersonalityStep";
import VoiceSettingsStep from "./wizard-steps/VoiceSettingsStep";
import BackgroundStep from "./wizard-steps/BackgroundStep";

interface CharacterCreationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (character: Omit<VirtualCharacter, "id" | "isActive">) => void;
}

export interface CharacterFormData {
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  characterType: string;
  avatar: string;
  avatarType: "emoji" | "image" | "generated";
  imageUrl?: string;
  imagePrompt?: string;
  personalityTraits: string[];
  thinkingStyle: string;
  toneStyle: string;
  voiceEngine: "edge" | "local" | "none";
  voiceType: string;
  speakingRate: number;
  pitch: number;
  backgroundStory: string;
  systemPrompt: string;
}

const initialFormData: CharacterFormData = {
  name: "",
  gender: "other",
  characterType: "assistant",
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
};

const CharacterCreationWizard: React.FC<CharacterCreationWizardProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CharacterFormData>(initialFormData);

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    // 根据表单数据生成系统提示词
    const completeSystemPrompt = generateSystemPrompt(formData);

    // 创建角色对象
    const newCharacter = {
      name: formData.name,
      avatar: formData.avatarType === "emoji" ? formData.avatar : "👤", // 如果不是emoji则使用默认头像
      systemPrompt: completeSystemPrompt,
      // 添加其他可能需要的字段
      imageUrl: formData.imageUrl,
      voiceSettings: {
        engine: formData.voiceEngine,
        type: formData.voiceType,
        rate: formData.speakingRate,
        pitch: formData.pitch,
      },
    };

    onSave(newCharacter);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
  };

  // 根据表单数据生成系统提示词
  const generateSystemPrompt = (data: CharacterFormData): string => {
    let prompt = data.systemPrompt || "";

    if (!prompt) {
      let basePrompt = `你是${data.name}`;

      // 添加性别
      if (data.gender !== "other") {
        const genderText = data.gender === "male" ? "男性" : "女性";
        basePrompt += `，一位${genderText}`;
      }

      // 添加角色类型
      basePrompt += `，是一名${
        t(`characterTypes.${data.characterType}`) || data.characterType
      }。`;

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

  if (!isOpen) return null;

  // 根据当前步骤渲染对应的表单组件
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep formData={formData} updateFormData={updateFormData} />
        );
      case 2:
        return (
          <AvatarStep formData={formData} updateFormData={updateFormData} />
        );
      case 3:
        return (
          <PersonalityStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return (
          <VoiceSettingsStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 5:
        return (
          <BackgroundStep formData={formData} updateFormData={updateFormData} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">
            {t("characters.createWizard.title")}
          </h2>
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        {/* 进度条 */}
        <div className="mb-6">
          <div className="flex justify-between mb-1">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`text-xs font-medium ${
                  index + 1 <= currentStep
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-400"
                }`}
              >
                {t(`characters.createWizard.steps.${index + 1}.title`)}
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div
              className="h-2 bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* 步骤内容 */}
        <div className="min-h-[320px]">{renderStepContent()}</div>

        {/* 底部按钮 */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={currentStep === 1 ? onClose : handlePrevious}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            {currentStep === 1
              ? t("common.cancel")
              : t("characters.createWizard.previous")}
          </button>
          <button
            type="button"
            onClick={currentStep === totalSteps ? handleSubmit : handleNext}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            {currentStep === totalSteps
              ? t("characters.createWizard.create")
              : t("characters.createWizard.next")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterCreationWizard;
