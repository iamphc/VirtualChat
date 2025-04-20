import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CharacterFormData } from "../CharacterCreationWizard";

interface PersonalityStepProps {
  formData: CharacterFormData;
  updateFormData: (field: string, value: any) => void;
}

const PersonalityStep: React.FC<PersonalityStepProps> = ({
  formData,
  updateFormData,
}) => {
  const { t } = useLanguage();

  const personalityTraits = [
    { value: "friendly", label: t("personalityTraits.friendly") },
    { value: "serious", label: t("personalityTraits.serious") },
    { value: "humorous", label: t("personalityTraits.humorous") },
    { value: "professional", label: t("personalityTraits.professional") },
    { value: "creative", label: t("personalityTraits.creative") },
    { value: "analytical", label: t("personalityTraits.analytical") },
    { value: "empathetic", label: t("personalityTraits.empathetic") },
    { value: "curious", label: t("personalityTraits.curious") },
    { value: "patient", label: t("personalityTraits.patient") },
    { value: "adventurous", label: t("personalityTraits.adventurous") },
  ];

  const thinkingStyles = [
    { value: "concise", label: t("thinkingStyles.concise") },
    { value: "academic", label: t("thinkingStyles.academic") },
    { value: "inquiring", label: t("thinkingStyles.inquiring") },
    { value: "philosophical", label: t("thinkingStyles.philosophical") },
    { value: "balanced", label: t("thinkingStyles.balanced") },
  ];

  const toneStyles = [
    { value: "friendly", label: t("toneStyles.friendly") },
    { value: "formal", label: t("toneStyles.formal") },
    { value: "casual", label: t("toneStyles.casual") },
    { value: "professional", label: t("toneStyles.professional") },
    { value: "enthusiastic", label: t("toneStyles.enthusiastic") },
  ];

  const handlePersonalityTraitChange = (trait: string) => {
    const currentTraits = [...formData.personalityTraits];
    const index = currentTraits.indexOf(trait);

    if (index === -1) {
      // 如果特质不在数组中，添加它
      currentTraits.push(trait);
    } else {
      // 如果特质已在数组中，移除它
      currentTraits.splice(index, 1);
    }

    updateFormData("personalityTraits", currentTraits);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium dark:text-white mb-4">
        {t("characters.createWizard.steps.3.title")}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {t("characters.createWizard.steps.3.description")}
      </p>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("characters.createWizard.personalityTraits")}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {personalityTraits.map((trait) => (
            <label key={trait.value} className="inline-flex items-center">
              <input
                type="checkbox"
                value={trait.value}
                checked={formData.personalityTraits.includes(trait.value)}
                onChange={() => handlePersonalityTraitChange(trait.value)}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {trait.label}
              </span>
            </label>
          ))}
        </div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {t("characters.createWizard.selectMultiple")}
        </p>
      </div>

      <div>
        <label
          htmlFor="thinkingStyle"
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t("characters.createWizard.thinkingStyle")}
        </label>
        <select
          id="thinkingStyle"
          value={formData.thinkingStyle}
          onChange={(e) => updateFormData("thinkingStyle", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        >
          {thinkingStyles.map((style) => (
            <option key={style.value} value={style.value}>
              {style.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="toneStyle"
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t("characters.createWizard.toneStyle")}
        </label>
        <select
          id="toneStyle"
          value={formData.toneStyle}
          onChange={(e) => updateFormData("toneStyle", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        >
          {toneStyles.map((style) => (
            <option key={style.value} value={style.value}>
              {style.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PersonalityStep;
