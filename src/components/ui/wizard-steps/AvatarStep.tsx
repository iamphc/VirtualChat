import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CharacterFormData } from "../CharacterCreationWizard";

interface AvatarStepProps {
  formData: CharacterFormData;
  updateFormData: (field: string, value: any) => void;
}

const AvatarStep: React.FC<AvatarStepProps> = ({
  formData,
  updateFormData,
}) => {
  const { t } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);

  const emojis = [
    "🤖",
    "👩‍💼",
    "👨‍🏫",
    "👩‍🔬",
    "👨‍💻",
    "👩‍🍳",
    "👨‍🎨",
    "👩‍✈️",
    "👨‍🚀",
    "🧙‍♂️",
    "🧙‍♀️",
    "🧠",
    "💪",
    "✈️",
    "🏝️",
    "📚",
    "🎮",
    "🎵",
    "🎨",
    "🔮",
    "🐱",
    "🐶",
    "🦊",
    "🦁",
    "🐼",
    "🐨",
    "🐯",
    "🦄",
    "🐝",
    "🦋",
    "🐢",
    "🐙",
    "🦉",
    "🦆",
    "🦅",
  ];

  // 模拟生成头像的函数
  const generateAvatar = async () => {
    if (!formData.imagePrompt) return;

    setIsGenerating(true);

    // 这里应该调用实际的图像生成API
    // 现在仅作为演示，使用一个延迟来模拟异步处理
    setTimeout(() => {
      // 生成的图像URL (这里使用一个假URL作为示例)
      const generatedImageUrl = "https://example.com/generated-avatar.jpg";
      updateFormData("imageUrl", generatedImageUrl);
      updateFormData("avatarType", "generated");
      setIsGenerating(false);
    }, 2000);
  };

  // 处理文件上传
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        updateFormData("imageUrl", event.target.result as string);
        updateFormData("avatarType", "image");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium dark:text-white mb-4">
        {t("characters.createWizard.steps.2.title")}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {t("characters.createWizard.steps.2.description")}
      </p>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("characters.createWizard.avatarType")}
        </label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="avatarType"
              value="emoji"
              checked={formData.avatarType === "emoji"}
              onChange={() => updateFormData("avatarType", "emoji")}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {t("characters.createWizard.avatarOptions.emoji")}
            </span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="avatarType"
              value="image"
              checked={formData.avatarType === "image"}
              onChange={() => updateFormData("avatarType", "image")}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {t("characters.createWizard.avatarOptions.upload")}
            </span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="avatarType"
              value="generated"
              checked={formData.avatarType === "generated"}
              onChange={() => updateFormData("avatarType", "generated")}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {t("characters.createWizard.avatarOptions.generate")}
            </span>
          </label>
        </div>
      </div>

      {formData.avatarType === "emoji" && (
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("characters.avatar")}
          </label>
          <div className="grid grid-cols-10 gap-2">
            {emojis.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => updateFormData("avatar", emoji)}
                className={`w-8 h-8 flex items-center justify-center text-xl rounded-md ${
                  formData.avatar === emoji
                    ? "bg-blue-100 dark:bg-blue-900"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {formData.avatarType === "image" && (
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("characters.createWizard.uploadImage")}
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-700 dark:text-gray-300 
                        file:mr-4 file:py-2 file:px-4 file:rounded-md
                        file:border-0 file:text-sm file:font-medium
                        file:bg-blue-50 file:text-blue-700
                        dark:file:bg-blue-900 dark:file:text-blue-200
                        hover:file:bg-blue-100 dark:hover:file:bg-blue-800"
            />
            {formData.imageUrl && (
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img
                  src={formData.imageUrl}
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {formData.avatarType === "generated" && (
        <div>
          <label
            htmlFor="imagePrompt"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t("characters.createWizard.imagePrompt")}
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              id="imagePrompt"
              value={formData.imagePrompt || ""}
              onChange={(e) => updateFormData("imagePrompt", e.target.value)}
              placeholder={t("characters.createWizard.imagePromptPlaceholder")}
              className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="button"
              onClick={generateAvatar}
              disabled={isGenerating || !formData.imagePrompt}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? t("common.generating") : t("common.generate")}
            </button>
          </div>
          {formData.imageUrl && formData.avatarType === "generated" && (
            <div className="mt-4 flex justify-center">
              <div className="w-32 h-32 rounded-full overflow-hidden">
                <img
                  src={formData.imageUrl}
                  alt="Generated avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {t("characters.createWizard.generationDisclaimer")}
          </p>
        </div>
      )}
    </div>
  );
};

export default AvatarStep;
