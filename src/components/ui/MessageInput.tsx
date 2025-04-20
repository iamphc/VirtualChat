import React, { KeyboardEvent, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  buttonText?: string;
  className?: string;
  onGenerateImage?: (prompt: string) => Promise<string>;
  isGeneratingImage?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onSend,
  onKeyDown,
  placeholder = "输入消息...",
  disabled = false,
  buttonText = "发送",
  className = "",
  onGenerateImage,
  isGeneratingImage = false,
}) => {
  const { t } = useLanguage();
  const [imageGenerationError, setImageGenerationError] = useState<
    string | null
  >(null);

  // 直接生成图像，不需要用户输入描述
  const handleGenerateImage = async () => {
    if (!onGenerateImage) return;

    setImageGenerationError(null);

    try {
      // 使用默认描述调用父组件提供的图像生成函数
      const defaultPrompt = "生成一张随机图像";
      const imageUrl = await onGenerateImage(defaultPrompt);

      // 将图像插入到消息中
      onChange(value + `\n[${t("common.image")}](${imageUrl})`);
    } catch (error) {
      // 显示错误信息
      setImageGenerationError(
        typeof error === "string" ? error : t("common.generationError")
      );

      // 3秒后清除错误信息
      setTimeout(() => {
        setImageGenerationError(null);
      }, 3000);
    }
  };

  return (
    <div className="w-full">
      {imageGenerationError && (
        <div className="mb-3 p-3 bg-red-100 dark:bg-red-900 dark:bg-opacity-20 rounded-lg">
          <div className="text-sm text-red-500 dark:text-red-400">
            {imageGenerationError}
          </div>
        </div>
      )}

      <div className={`flex space-x-3 items-end ${className}`}>
        <div className="flex items-center space-x-2 mb-2 mr-2">
          <button
            type="button"
            onClick={handleGenerateImage}
            disabled={disabled || isGeneratingImage}
            className={`text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 focus:outline-none ${
              isGeneratingImage ? "opacity-50 cursor-not-allowed" : ""
            }`}
            title={t("common.addImage")}
          >
            <i
              className={`ri-image-add-line text-xl ${
                isGeneratingImage ? "animate-pulse" : ""
              }`}
            ></i>
          </button>
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 rounded-lg border dark:border-gray-600 dark:border-opacity-30 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none dark:backdrop-blur-lg"
          placeholder={placeholder}
          rows={1}
          disabled={disabled}
        />
        <button
          onClick={onSend}
          disabled={disabled || !value.trim()}
          className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {disabled && buttonText === "发送" ? "发送中..." : buttonText}
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
