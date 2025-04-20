import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import ScrollToTop from "@/components/common/ScrollToTop";
import SelectField from "@/components/ui/SelectField";
import useSettings from "./useSettings";
import { useLanguage } from "@/context/LanguageContext";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const {
    settings,
    showSavedMessage,
    availableModels,
    availableVoiceModels,
    availableImageModels,
    localModels,
    modelStarting,
    modelError,
    updateSettings,
    updateNestedSettings,
    resetSettings,
    selectLocalModelPath,
    scanLocalModels,
    startLocalModel,
  } = useSettings();

  // 配置项组件，用于语言等简单选项
  const SettingSection = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {title}
      </label>
      {children}
    </div>
  );

  // 文本模型设置区域组件
  const TextModelSettings = () => (
    <div className="pt-4 border-t">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">文本模型设置</h2>

      <div className="space-y-4">
        <SelectField
          label="选择模型"
          value={settings.textModelSettings.model}
          onChange={(value) =>
            updateNestedSettings(["textModelSettings", "model"], value)
          }
          options={availableModels.map((model) => ({
            value: model.id,
            label: `${model.name} - ${model.provider}`,
            description: model.description,
          }))}
          description={
            availableModels.find(
              (m) => m.id === settings.textModelSettings.model
            )?.description || "本地运行的大型语言模型"
          }
        />

        <LocalModelSettings />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            回复随机性（温度）
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.textModelSettings.temperature}
              onChange={(e) =>
                updateNestedSettings(
                  ["textModelSettings", "temperature"],
                  parseFloat(e.target.value)
                )
              }
              className="w-full"
            />
            <span>{settings.textModelSettings.temperature}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            值越大回复越随机、有创意；值越小回复越固定、可靠
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            最大回复长度
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="500"
              max="4000"
              step="100"
              value={settings.textModelSettings.maxTokens}
              onChange={(e) =>
                updateNestedSettings(
                  ["textModelSettings", "maxTokens"],
                  parseInt(e.target.value)
                )
              }
              className="w-full"
            />
            <span>{settings.textModelSettings.maxTokens}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            限制AI回复的最大长度，数值越大回复越长
          </p>
        </div>

        <div className="flex items-center mt-4">
          <input
            id="streaming"
            type="checkbox"
            className="mr-2"
            checked={settings.textModelSettings.streamingEnabled}
            onChange={(e) =>
              updateNestedSettings(
                ["textModelSettings", "streamingEnabled"],
                e.target.checked
              )
            }
          />
          <label htmlFor="streaming">启用流式回复（打字效果）</label>
        </div>
      </div>
    </div>
  );

  // 语音模型设置区域组件
  const VoiceModelSettings = () => (
    <div className="pt-4 mt-6 border-t">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">语音模型设置</h2>

      <div className="space-y-4">
        <SelectField
          label="选择语音模型"
          value={settings.voiceModelSettings.model}
          onChange={(value) =>
            updateNestedSettings(["voiceModelSettings", "model"], value)
          }
          options={availableVoiceModels.map((model) => ({
            value: model.id,
            label: `${model.name} - ${model.provider}`,
            description: model.description,
          }))}
          description={
            availableVoiceModels.find(
              (m) => m.id === settings.voiceModelSettings.model
            )?.description || "文本转语音服务"
          }
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            语音质量
          </label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="quality-standard"
                name="voice-quality"
                value="standard"
                checked={settings.voiceModelSettings.quality === "standard"}
                onChange={() =>
                  updateNestedSettings(
                    ["voiceModelSettings", "quality"],
                    "standard"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="quality-standard">标准</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="quality-high"
                name="voice-quality"
                value="high"
                checked={settings.voiceModelSettings.quality === "high"}
                onChange={() =>
                  updateNestedSettings(
                    ["voiceModelSettings", "quality"],
                    "high"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="quality-high">高质量</label>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            语速
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={settings.voiceModelSettings.speakingRate}
              onChange={(e) =>
                updateNestedSettings(
                  ["voiceModelSettings", "speakingRate"],
                  parseFloat(e.target.value)
                )
              }
              className="w-full"
            />
            <span>{settings.voiceModelSettings.speakingRate}x</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            音调
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={settings.voiceModelSettings.pitch}
              onChange={(e) =>
                updateNestedSettings(
                  ["voiceModelSettings", "pitch"],
                  parseFloat(e.target.value)
                )
              }
              className="w-full"
            />
            <span>{settings.voiceModelSettings.pitch}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // 图像生成模型设置区域组件
  const ImageModelSettings = () => (
    <div className="pt-4 mt-6 border-t">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        图像生成模型设置
      </h2>

      <div className="space-y-4">
        <SelectField
          label="选择图像模型"
          value={settings.imageModelSettings.model}
          onChange={(value) =>
            updateNestedSettings(["imageModelSettings", "model"], value)
          }
          options={availableImageModels.map((model) => ({
            value: model.id,
            label: `${model.name} - ${model.provider}`,
            description: model.description,
          }))}
          description={
            availableImageModels.find(
              (m) => m.id === settings.imageModelSettings.model
            )?.description || "图像生成服务"
          }
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            图像分辨率
          </label>
          <select
            value={settings.imageModelSettings.resolution}
            onChange={(e) =>
              updateNestedSettings(
                ["imageModelSettings", "resolution"],
                e.target.value
              )
            }
            className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="256x256">256x256</option>
            <option value="512x512">512x512</option>
            <option value="1024x1024">1024x1024</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            图像质量
          </label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="img-quality-standard"
                name="img-quality"
                value="standard"
                checked={settings.imageModelSettings.quality === "standard"}
                onChange={() =>
                  updateNestedSettings(
                    ["imageModelSettings", "quality"],
                    "standard"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="img-quality-standard">标准</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="img-quality-hd"
                name="img-quality"
                value="hd"
                checked={settings.imageModelSettings.quality === "hd"}
                onChange={() =>
                  updateNestedSettings(["imageModelSettings", "quality"], "hd")
                }
                className="mr-2"
              />
              <label htmlFor="img-quality-hd">高清</label>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            图像风格
          </label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="style-natural"
                name="img-style"
                value="natural"
                checked={settings.imageModelSettings.style === "natural"}
                onChange={() =>
                  updateNestedSettings(
                    ["imageModelSettings", "style"],
                    "natural"
                  )
                }
                className="mr-2"
              />
              <label htmlFor="style-natural">自然</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="style-vivid"
                name="img-style"
                value="vivid"
                checked={settings.imageModelSettings.style === "vivid"}
                onChange={() =>
                  updateNestedSettings(["imageModelSettings", "style"], "vivid")
                }
                className="mr-2"
              />
              <label htmlFor="style-vivid">生动</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 本地模型设置组件
  const LocalModelSettings = () => (
    <div className="border-t pt-4 mt-4">
      <h3 className="text-md font-medium text-gray-800 mb-3">本地模型设置</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          本地模型目录
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="flex-1 border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="选择本地模型所在目录"
            value={settings.textModelSettings.localModelPath}
            readOnly
          />
          <Button variant="secondary" size="sm" onClick={selectLocalModelPath}>
            浏览...
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            可用本地模型
          </label>
          <Button variant="secondary" size="sm" onClick={scanLocalModels}>
            刷新
          </Button>
        </div>

        <div className="border rounded-md p-2 max-h-40 overflow-y-auto bg-gray-50">
          {localModels.length > 0 ? (
            <div className="space-y-2">
              {localModels.map((model) => (
                <div
                  key={model.name}
                  className="flex justify-between items-center p-2 hover:bg-gray-100 rounded"
                >
                  <div>
                    <div className="font-medium">{model.name}</div>
                    <div className="text-xs text-gray-500">{model.id}</div>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => startLocalModel(model.id)}
                    disabled={modelStarting}
                  >
                    {modelStarting ? "启动中..." : "启动"}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-2">
              {settings.textModelSettings.localModelPath
                ? "未找到本地模型，请确认路径是否正确"
                : "请先选择本地模型目录"}
            </div>
          )}
        </div>

        {modelError && (
          <div className="text-red-500 text-sm mt-2">{modelError}</div>
        )}
      </div>
    </div>
  );

  // 主题选择组件
  const ThemeSelector = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        界面主题
      </label>
      <div className="grid grid-cols-3 gap-4">
        <div
          className={`border p-4 rounded-lg cursor-pointer hover:border-blue-500 ${
            settings.theme === "light"
              ? "border-blue-500 bg-blue-50"
              : "bg-white"
          }`}
          onClick={() => updateSettings({ theme: "light" })}
        >
          <div className="h-12 bg-white border mb-2 rounded"></div>
          <div className="text-center text-sm">浅色</div>
        </div>
        <div
          className={`border p-4 rounded-lg cursor-pointer hover:border-blue-500 ${
            settings.theme === "dark" ? "border-blue-500 bg-blue-50" : ""
          }`}
          onClick={() => updateSettings({ theme: "dark" })}
        >
          <div className="h-12 bg-gray-800 mb-2 rounded"></div>
          <div className="text-center text-sm">深色</div>
        </div>
        <div
          className={`border p-4 rounded-lg cursor-pointer hover:border-blue-500 ${
            settings.theme === "system" ? "border-blue-500 bg-blue-50" : ""
          }`}
          onClick={() => updateSettings({ theme: "system" })}
        >
          <div className="h-12 bg-gradient-to-r from-white to-gray-800 mb-2 rounded"></div>
          <div className="text-center text-sm">系统</div>
        </div>
      </div>
    </div>
  );

  // 通知设置组件
  const NotificationSettings = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        通知设置
      </label>
      <div className="space-y-2">
        <div className="flex items-center">
          <input
            id="desktop"
            type="checkbox"
            className="mr-2"
            checked={settings.notifications.desktop}
            onChange={(e) =>
              updateNestedSettings(
                ["notifications", "desktop"],
                e.target.checked
              )
            }
          />
          <label htmlFor="desktop">桌面通知</label>
        </div>
        <div className="flex items-center">
          <input
            id="sound"
            type="checkbox"
            className="mr-2"
            checked={settings.notifications.sound}
            onChange={(e) =>
              updateNestedSettings(["notifications", "sound"], e.target.checked)
            }
          />
          <label htmlFor="sound">消息提示音</label>
        </div>

        {settings.notifications.sound && (
          <div className="mt-2">
            <label
              htmlFor="sound-volume"
              className="block text-sm text-gray-600 mb-1"
            >
              音量: {settings.notifications.volume || 1}
            </label>
            <div className="flex items-center">
              <span className="text-sm mr-2">🔈</span>
              <input
                id="sound-volume"
                type="range"
                min="0"
                max="1"
                step="0.1"
                className="w-full"
                value={settings.notifications.volume || 1}
                onChange={(e) =>
                  updateNestedSettings(
                    ["notifications", "volume"],
                    parseFloat(e.target.value)
                  )
                }
              />
              <span className="text-sm ml-2">🔊</span>
            </div>
            <div className="mt-2">
              <button
                className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                onClick={() => {
                  // 导入并使用测试声音功能
                  import("@/utils/audioUtils").then(
                    ({ playMessageSound, setMessageSoundVolume }) => {
                      setMessageSoundVolume(settings.notifications.volume || 1);
                      playMessageSound();
                    }
                  );
                }}
              >
                测试声音
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-6 overflow-y-auto h-screen" id="settings-container">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {t("settings.title")}
          </h1>
          <Button variant="outline" size="sm" onClick={() => navigate("/")}>
            {t("settings.backToChat")}
          </Button>
        </div>

        {showSavedMessage && (
          <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">
            {t("settings.saved")}
          </div>
        )}

        <div className="space-y-6">
          <SettingSection title={t("settings.userName")}>
            <input
              type="text"
              className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={t("settings.userNamePlaceholder")}
              value={settings.userName}
              onChange={(e) => updateSettings({ userName: e.target.value })}
            />
          </SettingSection>

          <SettingSection title={t("settings.avatar")}>
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                👤
              </div>
              <Button variant="secondary">{t("settings.changeAvatar")}</Button>
            </div>
          </SettingSection>

          <SettingSection title={t("settings.language")}>
            <SelectField
              label=""
              value={settings.language}
              onChange={(value) => updateSettings({ language: value })}
              options={[
                { value: "zh-CN", label: "简体中文" },
                { value: "zh-TW", label: "繁體中文" },
                { value: "en-US", label: "English (US)" },
                { value: "en-GB", label: "English (UK)" },
                { value: "ja-JP", label: "日本語" },
                { value: "ko-KR", label: "한국어" },
                { value: "fr-FR", label: "Français" },
                { value: "de-DE", label: "Deutsch" },
                { value: "es-ES", label: "Español" },
                { value: "it-IT", label: "Italiano" },
                { value: "ru-RU", label: "Русский" },
              ]}
              description={t("settings.languageHint")}
            />
          </SettingSection>

          <ThemeSelector />

          <NotificationSettings />

          {/* 模型设置部分 */}
          <TextModelSettings />
          <VoiceModelSettings />
          <ImageModelSettings />

          <div className="flex justify-end pt-4 border-t">
            <Button
              variant="outline"
              onClick={resetSettings}
              className="text-red-600 hover:bg-red-50"
            >
              {t("settings.buttons.reset")}
            </Button>
          </div>
        </div>
      </div>

      <ScrollToTop containerSelector="#settings-container" threshold={300} />
    </div>
  );
};

export default Settings;
