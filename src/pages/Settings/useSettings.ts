import { useState, useEffect } from "react";
import { UserSettings, AIModel, LocalModel } from "@/types";
import { LANGUAGE_CHANGE_EVENT } from "@/context/LanguageContext";

// 定义一个electron全局类型，避免TS错误
declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        invoke(channel: string, ...args: any[]): Promise<any>;
      };
    };
  }
}

// 使用通过contextBridge暴露的API
console.log("检查window.electron是否可用:", !!window.electron);
const ipcRenderer = window.electron?.ipcRenderer;

export const useSettings = () => {
  // 默认用户设置
  const defaultSettings: UserSettings = {
    userName: "用户",
    language: "zh-CN",
    theme: "light",
    notifications: {
      desktop: true,
      sound: true,
      volume: 1.0,
    },
    textModelSettings: {
      model: "llama3",
      apiKey: "",
      temperature: 0.7,
      maxTokens: 2000,
      streamingEnabled: true,
      localModelPath: "",
      selectedLocalModel: "",
    },
    voiceModelSettings: {
      model: "edge-tts",
      apiKey: "",
      quality: "standard",
      speakingRate: 1.0,
      pitch: 1.0,
    },
    imageModelSettings: {
      model: "stable-diffusion",
      apiKey: "",
      resolution: "512x512",
      quality: "standard",
      style: "natural",
    },
  };

  // 可用的AI模型列表
  const availableModels: AIModel[] = [
    {
      id: "llama3",
      name: "Llama 3 (8B)",
      provider: "Ollama",
      description: "Meta的开源大语言模型，运行于本地",
    },
    {
      id: "llama3:70b",
      name: "Llama 3 (70B)",
      provider: "Ollama",
      description: "Meta的开源大语言模型，参数量更大",
    },
    {
      id: "mixtral",
      name: "Mixtral 8x7B",
      provider: "Ollama",
      description: "Mistral AI的混合专家模型",
    },
    {
      id: "gemma",
      name: "Gemma",
      provider: "Ollama",
      description: "Google的轻量级开源模型",
    },
  ];

  // 可用的语音模型列表
  const availableVoiceModels: AIModel[] = [
    {
      id: "edge-tts",
      name: "Edge TTS",
      provider: "Microsoft",
      description: "微软Edge浏览器的文本转语音服务",
    },
    {
      id: "openai-tts",
      name: "OpenAI TTS",
      provider: "OpenAI",
      description: "OpenAI的高质量文本转语音服务",
    },
    {
      id: "local-tts",
      name: "本地TTS",
      provider: "本地",
      description: "本地运行的文本转语音服务",
    },
  ];

  // 可用的图像生成模型列表
  const availableImageModels: AIModel[] = [
    {
      id: "stable-diffusion",
      name: "Stable Diffusion",
      provider: "本地",
      description: "本地运行的图像生成模型",
    },
    {
      id: "dalle",
      name: "DALL-E",
      provider: "OpenAI",
      description: "OpenAI的图像生成服务",
    },
    {
      id: "midjourney",
      name: "Midjourney",
      provider: "Midjourney",
      description: "Midjourney的图像生成服务",
    },
  ];

  // 用户设置状态
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  // 是否显示保存成功消息
  const [showSavedMessage, setShowSavedMessage] = useState<boolean>(false);
  // 本地模型列表
  const [localModels, setLocalModels] = useState<LocalModel[]>([]);
  // 模型启动状态
  const [modelStarting, setModelStarting] = useState<boolean>(false);
  // 模型启动错误信息
  const [modelError, setModelError] = useState<string>("");

  // 加载保存的设置
  useEffect(() => {
    const savedSettings = localStorage.getItem("userSettings");
    if (savedSettings) {
      try {
        // 解析保存的设置
        const parsedSettings = JSON.parse(savedSettings);

        // 检查是否为旧格式设置（包含aiSettings）
        if (parsedSettings.aiSettings && !parsedSettings.textModelSettings) {
          console.log("检测到旧格式设置，正在转换...");

          // 转换为新格式
          const convertedSettings = {
            ...parsedSettings,
            textModelSettings: {
              ...parsedSettings.aiSettings,
            },
            voiceModelSettings: {
              model: "edge-tts",
              apiKey: "",
              quality: "standard",
              speakingRate: 1.0,
              pitch: 1.0,
            },
            imageModelSettings: {
              model: "stable-diffusion",
              apiKey: "",
              resolution: "512x512",
              quality: "standard",
              style: "natural",
            },
          };

          // 删除旧格式的aiSettings
          delete convertedSettings.aiSettings;

          // 更新设置
          setSettings(convertedSettings);

          // 同时更新localStorage，以便下次加载正确格式
          localStorage.setItem(
            "userSettings",
            JSON.stringify(convertedSettings)
          );
          console.log("设置格式转换完成");
        } else {
          // 已经是新格式，直接使用
          setSettings(parsedSettings);
        }
      } catch (error) {
        console.error("Failed to parse saved settings:", error);
        // 如果解析失败，使用默认设置
        setSettings(defaultSettings);
      }
    }
  }, []);

  // 如果有本地模型路径，则扫描模型
  useEffect(() => {
    if (
      settings.textModelSettings &&
      settings.textModelSettings.localModelPath
    ) {
      scanLocalModels();
    }
  }, [settings.textModelSettings?.localModelPath]);

  // 更新设置
  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      // 立即保存设置
      localStorage.setItem("userSettings", JSON.stringify(updated));

      // 如果更新了主题，触发主题变更事件
      if (newSettings.theme) {
        window.dispatchEvent(new Event("themeChange"));
      }

      // 如果更新了语言，触发语言变更事件
      if (newSettings.language) {
        window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
      }

      // 显示保存成功提示
      setShowSavedMessage(true);
      setTimeout(() => {
        setShowSavedMessage(false);
      }, 3000);

      return updated;
    });
  };

  // 更新嵌套的设置属性
  const updateNestedSettings = (path: string[], value: any) => {
    setSettings((prev) => {
      // 深拷贝当前设置
      const updated = JSON.parse(JSON.stringify(prev));

      // 找到并更新嵌套属性
      let current = updated;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;

      // 立即保存设置
      localStorage.setItem("userSettings", JSON.stringify(updated));

      // 显示保存成功提示
      setShowSavedMessage(true);
      setTimeout(() => {
        setShowSavedMessage(false);
      }, 3000);

      return updated;
    });
  };

  // 重置设置到默认值
  const resetSettings = () => {
    setSettings(defaultSettings);

    // 立即保存默认设置
    localStorage.setItem("userSettings", JSON.stringify(defaultSettings));

    // 触发主题变更事件
    window.dispatchEvent(new Event("themeChange"));

    // 触发语言变更事件
    window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));

    // 显示保存成功提示
    setShowSavedMessage(true);
    setTimeout(() => {
      setShowSavedMessage(false);
    }, 3000);
  };

  // 选择本地模型路径
  const selectLocalModelPath = async () => {
    try {
      console.log("尝试打开文件选择器...");

      if (!ipcRenderer) {
        console.error("错误: ipcRenderer未定义，无法调用select-directory");
        alert("无法打开文件选择器，ipcRenderer未定义");
        return;
      }

      const result = await ipcRenderer.invoke("select-directory");
      console.log("文件选择结果:", result);

      if (result && !result.canceled && result.filePaths.length > 0) {
        updateNestedSettings(
          ["textModelSettings", "localModelPath"],
          result.filePaths[0]
        );
      }
    } catch (error) {
      console.error("选择目录失败:", error);
      alert(
        `选择目录失败: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  };

  // 扫描本地模型
  const scanLocalModels = async () => {
    try {
      if (
        !settings.textModelSettings ||
        !settings.textModelSettings.localModelPath
      )
        return;

      const models = await ipcRenderer.invoke(
        "scan-models",
        settings.textModelSettings.localModelPath
      );
      setLocalModels(models);

      // 如果没有选择的本地模型，且找到了模型，默认选择第一个
      if (!settings.textModelSettings.selectedLocalModel && models.length > 0) {
        updateNestedSettings(
          ["textModelSettings", "selectedLocalModel"],
          models[0].id
        );
      }
    } catch (error) {
      console.error("扫描模型失败:", error);
      setLocalModels([]);
    }
  };

  // 启动本地模型
  const startLocalModel = async (modelId: string) => {
    setModelStarting(true);
    setModelError("");

    try {
      if (
        !settings.textModelSettings ||
        !settings.textModelSettings.localModelPath
      ) {
        throw new Error("未设置模型路径");
      }

      const selectedModel = localModels.find((m) => m.id === modelId);
      if (!selectedModel) {
        throw new Error("未找到选择的模型");
      }

      await ipcRenderer.invoke("start-model", selectedModel);
      // 启动成功后，更新当前选择的模型
      updateNestedSettings(
        ["textModelSettings", "selectedLocalModel"],
        modelId
      );
    } catch (error) {
      console.error("启动模型失败:", error);
      setModelError(error instanceof Error ? error.message : "启动失败");
    } finally {
      setModelStarting(false);
    }
  };

  return {
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
  };
};

export default useSettings;
