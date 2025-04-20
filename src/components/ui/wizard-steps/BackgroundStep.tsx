import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CharacterFormData } from "../CharacterCreationWizard";

interface BackgroundStepProps {
  formData: CharacterFormData;
  updateFormData: (field: string, value: any) => void;
}

const BackgroundStep: React.FC<BackgroundStepProps> = ({
  formData,
  updateFormData,
}) => {
  const { t } = useLanguage();

  // 生成系统提示词的预览
  const generateSystemPromptPreview = (): string => {
    let prompt = formData.systemPrompt || "";

    if (!prompt) {
      let basePrompt = `你是${formData.name}`;

      // 添加性别
      if (formData.gender !== "other") {
        const genderText = formData.gender === "male" ? "男性" : "女性";
        basePrompt += `，一位${genderText}`;
      }

      // 添加角色类型
      basePrompt += `，是一名${
        t(`characterTypes.${formData.characterType}`) || formData.characterType
      }。`;

      // 添加性格特点
      if (formData.personalityTraits.length > 0) {
        basePrompt += `你的性格特点是${formData.personalityTraits
          .map((trait) => t(`personalityTraits.${trait}`) || trait)
          .join("、")}。`;
      }

      // 添加思维和说话风格
      basePrompt += `你的思维风格是${
        t(`thinkingStyles.${formData.thinkingStyle}`) || formData.thinkingStyle
      }，`;
      basePrompt += `说话风格是${
        t(`toneStyles.${formData.toneStyle}`) || formData.toneStyle
      }。`;

      // 添加背景故事
      if (formData.backgroundStory) {
        basePrompt += `\n\n背景故事：${formData.backgroundStory}`;
      }

      prompt = basePrompt;
    }

    return prompt;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium dark:text-white mb-4">
        {t("characters.createWizard.steps.5.title")}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {t("characters.createWizard.steps.5.description")}
      </p>

      <div>
        <label
          htmlFor="backgroundStory"
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t("characters.createWizard.backgroundStory")}
        </label>
        <textarea
          id="backgroundStory"
          value={formData.backgroundStory}
          onChange={(e) => updateFormData("backgroundStory", e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder={t("characters.createWizard.backgroundStoryPlaceholder")}
        />
      </div>

      <div>
        <label
          htmlFor="systemPrompt"
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t("characters.systemPrompt")}
        </label>
        <textarea
          id="systemPrompt"
          value={formData.systemPrompt}
          onChange={(e) => updateFormData("systemPrompt", e.target.value)}
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder={t("characters.systemPromptPlaceholder")}
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {t("characters.createWizard.customizePrompt")}
        </p>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t("characters.createWizard.promptPreview")}
        </h4>
        <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">
          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {generateSystemPromptPreview()}
          </p>
        </div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {t("characters.createWizard.promptPreviewHint")}
        </p>
      </div>
    </div>
  );
};

export default BackgroundStep;
