import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CharacterFormData } from "@/pages/CreateCharacter/types";

interface BasicInfoStepProps {
  formData: CharacterFormData;
  updateFormData: <T extends keyof CharacterFormData>(
    field: T,
    value: CharacterFormData[T]
  ) => void;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  formData,
  updateFormData,
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium dark:text-white mb-4">
        {t("characters.createWizard.steps.1.title")}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {t("characters.createWizard.steps.1.description")}
      </p>

      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t("characters.name")} *
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => updateFormData("name", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("characters.createWizard.gender")}
        </label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={() => updateFormData("gender", "male")}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {t("characters.createWizard.genderOptions.male")}
            </span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={() => updateFormData("gender", "female")}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {t("characters.createWizard.genderOptions.female")}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoStep;
