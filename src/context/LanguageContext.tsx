import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import enUS from "@/locale/en-US";
import zhCN from "@/locale/zh-CN";
import zhTW from "@/locale/zh-TW";
import jaJP from "@/locale/ja-JP";
import koKR from "@/locale/ko-KR";
import frFR from "@/locale/fr-FR";
import deDE from "@/locale/de-DE";
import esES from "@/locale/es-ES";
import itIT from "@/locale/it-IT";
import ruRU from "@/locale/ru-RU";
import enGB from "@/locale/en-GB";
import { EVENTS, STORAGE_KEYS, DEFAULTS } from "@/constants";

// 支持的语言类型
type SupportedLanguage =
  | "en-US"
  | "zh-CN"
  | "zh-TW"
  | "ja-JP"
  | "ko-KR"
  | "fr-FR"
  | "de-DE"
  | "es-ES"
  | "it-IT"
  | "ru-RU"
  | "en-GB";

// 语言包类型
interface LanguageStrings {
  [key: string]: any;
}

// 语言上下文类型
interface LanguageContextType {
  language: SupportedLanguage;
  t: (key: string) => string;
  changeLanguage: (language: SupportedLanguage) => void;
}

// 语言包映射
const languagePacks: Record<SupportedLanguage, LanguageStrings> = {
  "en-US": enUS,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
  "ja-JP": jaJP,
  "ko-KR": koKR,
  "fr-FR": frFR,
  "de-DE": deDE,
  "es-ES": esES,
  "it-IT": itIT,
  "ru-RU": ruRU,
  "en-GB": enGB,
};

// 创建语言上下文
const LanguageContext = createContext<LanguageContextType>({
  language: "zh-CN",
  t: () => "",
  changeLanguage: () => {},
});

// 语言提供者Props类型
interface LanguageProviderProps {
  children: ReactNode;
}

// 自定义事件名称，用于触发立即语言更新
export const LANGUAGE_CHANGE_EVENT = EVENTS.LANGUAGE_CHANGE;

// 语言提供者组件
export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  // 从本地存储或默认值获取初始语言
  const getInitialLanguage = (): SupportedLanguage => {
    const savedSettings = localStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        if (
          settings.language &&
          languagePacks[settings.language as SupportedLanguage]
        ) {
          return settings.language as SupportedLanguage;
        }
      } catch (error) {
        console.error("Failed to parse saved language settings:", error);
      }
    }
    return DEFAULTS.LANGUAGE as SupportedLanguage; // 默认语言
  };

  const [language, setLanguage] = useState<SupportedLanguage>(
    getInitialLanguage()
  );

  // 翻译函数
  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = languagePacks[language];

    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        console.warn(
          `Translation key not found: ${key} in language ${language}`
        );
        // 尝试从英文包中获取
        let fallbackValue = languagePacks["en-US"];
        for (const k of keys) {
          if (fallbackValue && fallbackValue[k]) {
            fallbackValue = fallbackValue[k];
          } else {
            return key; // 如果在英文包中也找不到，返回键名
          }
        }
        return typeof fallbackValue === "string" ? fallbackValue : key;
      }
    }

    return typeof value === "string" ? value : key;
  };

  // 更改语言
  const changeLanguage = (newLanguage: SupportedLanguage) => {
    setLanguage(newLanguage);

    // 更新用户设置中的语言偏好
    const savedSettings = localStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        settings.language = newLanguage;
        localStorage.setItem(
          STORAGE_KEYS.USER_SETTINGS,
          JSON.stringify(settings)
        );
      } catch (error) {
        console.error("Failed to update language in settings:", error);
      }
    }
  };

  // 监听设置更改
  useEffect(() => {
    const handleStorageChange = () => {
      const savedSettings = localStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
      if (savedSettings) {
        try {
          const settings = JSON.parse(savedSettings);
          if (settings.language && settings.language !== language) {
            setLanguage(settings.language as SupportedLanguage);
          }
        } catch (error) {
          console.error("Failed to parse saved settings on change:", error);
        }
      }
    };

    // 监听自定义语言更改事件
    const handleLanguageChange = () => {
      const savedSettings = localStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
      if (savedSettings) {
        try {
          const settings = JSON.parse(savedSettings);
          if (settings.language && settings.language !== language) {
            setLanguage(settings.language as SupportedLanguage);
          }
        } catch (error) {
          console.error(
            "Failed to parse saved settings on language change:",
            error
          );
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange);
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 使用语言上下文的Hook
export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;
