import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CharacterFormData } from "../CharacterCreationWizard";

interface VoiceSettingsStepProps {
  formData: CharacterFormData;
  updateFormData: (field: string, value: any) => void;
}

const VoiceSettingsStep: React.FC<VoiceSettingsStepProps> = ({
  formData,
  updateFormData,
}) => {
  const { t } = useLanguage();

  // Edge TTS 中文声音列表
  const chineseVoices = [
    { value: "zh-CN-XiaoxiaoNeural", label: "晓晓 (女声)" },
    { value: "zh-CN-YunxiNeural", label: "云希 (男声)" },
    { value: "zh-CN-YunjianNeural", label: "云健 (男声)" },
    { value: "zh-CN-XiaoyiNeural", label: "晓伊 (女声)" },
    { value: "zh-CN-YunyangNeural", label: "云扬 (男声)" },
    { value: "zh-CN-XiaohanNeural", label: "晓涵 (女声)" },
    { value: "zh-CN-XiaomoNeural", label: "晓墨 (女声)" },
    { value: "zh-CN-XiaoxuanNeural", label: "晓萱 (女声)" },
    { value: "zh-CN-XiaoruiNeural", label: "晓瑞 (女声)" },
  ];

  // 英文声音列表
  const englishVoices = [
    { value: "en-US-AriaNeural", label: "Aria (Female)" },
    { value: "en-US-GuyNeural", label: "Guy (Male)" },
    { value: "en-US-JennyNeural", label: "Jenny (Female)" },
    { value: "en-US-SaraNeural", label: "Sara (Female)" },
    { value: "en-US-AnaNeural", label: "Ana (Female)" },
    { value: "en-US-BrandonNeural", label: "Brandon (Male)" },
    { value: "en-US-ChristopherNeural", label: "Christopher (Male)" },
    { value: "en-US-EricNeural", label: "Eric (Male)" },
    { value: "en-US-JacobNeural", label: "Jacob (Male)" },
    { value: "en-US-MichelleNeural", label: "Michelle (Female)" },
  ];

  // 测试语音的函数
  const testVoice = () => {
    if (formData.voiceEngine === "none" || !formData.voiceType) return;

    // 这里应该调用实际的语音合成API
    // 这是演示用的代码，实际实现需要替换
    const testText =
      formData.gender === "male"
        ? "你好，我是" + formData.name
        : "你好，我是" + formData.name;

    // 如果采用Edge TTS，可以使用如下方式调用Web Speech API
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(testText);
      // 在实际项目中，你可能需要根据formData.voiceType找到合适的voice
      utterance.rate = formData.speakingRate;
      utterance.pitch = formData.pitch;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("你的浏览器不支持语音合成API");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium dark:text-white mb-4">
        {t("characters.createWizard.steps.4.title")}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {t("characters.createWizard.steps.4.description")}
      </p>

      <div>
        <label
          htmlFor="voiceEngine"
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t("characters.createWizard.voiceEngine")}
        </label>
        <select
          id="voiceEngine"
          value={formData.voiceEngine}
          onChange={(e) => updateFormData("voiceEngine", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="none">
            {t("characters.createWizard.voiceEngines.none")}
          </option>
          <option value="edge">
            {t("characters.createWizard.voiceEngines.edge")}
          </option>
          <option value="local">
            {t("characters.createWizard.voiceEngines.local")}
          </option>
        </select>
      </div>

      {formData.voiceEngine !== "none" && (
        <>
          <div>
            <label
              htmlFor="voiceType"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("characters.createWizard.voiceType")}
            </label>
            <select
              id="voiceType"
              value={formData.voiceType}
              onChange={(e) => updateFormData("voiceType", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">
                {t("characters.createWizard.selectVoice")}
              </option>
              <optgroup label={t("characters.createWizard.chineseVoices")}>
                {chineseVoices.map((voice) => (
                  <option key={voice.value} value={voice.value}>
                    {voice.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label={t("characters.createWizard.englishVoices")}>
                {englishVoices.map((voice) => (
                  <option key={voice.value} value={voice.value}>
                    {voice.label}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <div>
            <label
              htmlFor="speakingRate"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("characters.createWizard.speakingRate")}:{" "}
              {formData.speakingRate.toFixed(1)}
            </label>
            <input
              type="range"
              id="speakingRate"
              min="0.5"
              max="2"
              step="0.1"
              value={formData.speakingRate}
              onChange={(e) =>
                updateFormData("speakingRate", parseFloat(e.target.value))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{t("characters.createWizard.slow")}</span>
              <span>{t("characters.createWizard.normal")}</span>
              <span>{t("characters.createWizard.fast")}</span>
            </div>
          </div>

          <div>
            <label
              htmlFor="pitch"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("characters.createWizard.pitch")}: {formData.pitch.toFixed(1)}
            </label>
            <input
              type="range"
              id="pitch"
              min="0.5"
              max="2"
              step="0.1"
              value={formData.pitch}
              onChange={(e) =>
                updateFormData("pitch", parseFloat(e.target.value))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{t("characters.createWizard.low")}</span>
              <span>{t("characters.createWizard.medium")}</span>
              <span>{t("characters.createWizard.high")}</span>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={testVoice}
              disabled={!formData.voiceType}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t("characters.createWizard.testVoice")}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default VoiceSettingsStep;
