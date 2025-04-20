import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCreateCharacter } from "./useCreateCharacter";

// 步骤组件导入
import BasicInfoStep from "@/components/ui/wizard-steps/BasicInfoStep";
import AvatarStep from "@/components/ui/wizard-steps/AvatarStep";
import PersonalityStep from "@/components/ui/wizard-steps/PersonalityStep";
import VoiceSettingsStep from "@/components/ui/wizard-steps/VoiceSettingsStep";
import BackgroundStep from "@/components/ui/wizard-steps/BackgroundStep";

const CreateCharacter: React.FC = () => {
  const { t } = useLanguage();
  const {
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
  } = useCreateCharacter();

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
    <div className="h-screen w-full bg-gray-50 dark:bg-gray-900 overflow-auto">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
          {/* 页面标题 */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold dark:text-white">
              {t("characters.createWizard.title")}
            </h1>
            <button
              type="button"
              onClick={goToHome}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              aria-label="Close"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>

          {/* 进度条 */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={`text-sm font-medium ${
                    index + 1 === currentStep
                      ? "text-blue-600 dark:text-blue-400 font-bold"
                      : index + 1 < currentStep
                      ? "text-blue-500 dark:text-blue-300"
                      : "text-gray-400 dark:text-gray-500 opacity-50"
                  }`}
                >
                  {index + 1}.{" "}
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

          {/* 验证错误提示 */}
          {validationError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {validationError}
            </div>
          )}

          {/* 步骤内容 */}
          <div className="min-h-[50vh] mb-8 py-4">{renderStepContent()}</div>

          {/* 底部按钮 */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={currentStep === 1 ? goToHome : handlePrevious}
              className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              {currentStep === 1
                ? t("common.cancel")
                : t("characters.createWizard.previous")}
            </button>
            <button
              type="button"
              onClick={currentStep === totalSteps ? handleSubmit : handleNext}
              className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              {currentStep === totalSteps
                ? t("characters.createWizard.create")
                : t("characters.createWizard.next")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCharacter;
