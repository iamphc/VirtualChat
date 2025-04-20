import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");

  // 加载主题设置
  const loadThemeFromStorage = () => {
    const storedSettings = localStorage.getItem("userSettings");
    if (storedSettings) {
      try {
        const settings = JSON.parse(storedSettings);
        setTheme(settings.theme || "light");
      } catch (error) {
        console.error("加载主题设置失败:", error);
      }
    }
  };

  useEffect(() => {
    // 初始加载
    loadThemeFromStorage();

    // 监听主题变更事件
    const handleThemeChange = () => {
      loadThemeFromStorage();
    };

    window.addEventListener("themeChange", handleThemeChange);

    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
    };
  }, []);

  useEffect(() => {
    // 应用主题
    const root = window.document.documentElement;

    // 移除现有的主题类
    root.classList.remove("light", "dark");

    // 如果是系统主题，则根据系统偏好应用
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      // 否则应用选择的主题
      root.classList.add(theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
