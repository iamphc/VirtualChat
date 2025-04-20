/**
 * 存储键名
 */
export const STORAGE_KEYS = {
  USER_SETTINGS: "userSettings",
  SIDEBAR_COLLAPSED: "sidebarCollapsed",
};

/**
 * 事件名称
 */
export const EVENTS = {
  THEME_CHANGE: "themeChange",
  LANGUAGE_CHANGE: "languageChange",
};

/**
 * API 地址
 */
export const API = {
  OLLAMA_CHAT: "http://localhost:11434/api/chat",
};

/**
 * 设置默认值
 */
export const DEFAULTS = {
  LANGUAGE: "zh-CN",
  THEME: "light",
  MODEL: "llama3",
  TEMPERATURE: 0.7,
  MAX_TOKENS: 2000,
};

/**
 * 动画和过渡
 */
export const TRANSITION = {
  SIDEBAR_EXPAND_DELAY: 150, // ms
  NOTIFICATION_TIMEOUT: 3000, // ms
};

/**
 * 尺寸
 */
export const SIZES = {
  SIDEBAR_EXPANDED: "w-64",
  SIDEBAR_COLLAPSED: "w-16",
};

/**
 * 路由路径
 */
export const ROUTES = {
  HOME: "/",
  SETTINGS: "/settings",
};
