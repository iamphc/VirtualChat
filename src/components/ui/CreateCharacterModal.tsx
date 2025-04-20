import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { VirtualCharacter } from "@/types";

interface CreateCharacterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (character: Omit<VirtualCharacter, "id" | "isActive">) => void;
}

const CreateCharacterModal: React.FC<CreateCharacterModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("🤖");
  const [systemPrompt, setSystemPrompt] = useState("");

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
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      name,
      avatar,
      systemPrompt: systemPrompt || `你是${name}，一个AI助手。`,
    });

    // 重置表单
    setName("");
    setAvatar("🤖");
    setSystemPrompt("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">
            {t("characters.createNew")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("characters.name")}
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("characters.avatar")}
            </label>
            <div className="grid grid-cols-10 gap-2">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setAvatar(emoji)}
                  className={`w-8 h-8 flex items-center justify-center text-xl rounded-md ${
                    avatar === emoji
                      ? "bg-blue-100 dark:bg-blue-900"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="systemPrompt"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("characters.systemPrompt")}
            </label>
            <textarea
              id="systemPrompt"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white h-32"
              placeholder={t("characters.systemPromptPlaceholder")}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              {t("common.cancel")}
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              {t("common.save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCharacterModal;
