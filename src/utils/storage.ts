import { STORAGE_KEYS } from "../constants";

/**
 * 存储工具类 - 提供对localStorage的封装
 */
export const Storage = {
  /**
   * 获取存储的值
   * @param key 存储键名
   * @param defaultValue 默认值
   * @returns 解析后的值或默认值
   */
  get<T>(key: string, defaultValue?: T): T | undefined {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return defaultValue;
    }
  },

  /**
   * 设置存储的值
   * @param key 存储键名
   * @param value 要存储的值
   */
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error);
    }
  },

  /**
   * 删除存储的值
   * @param key 存储键名
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
    }
  },

  /**
   * 获取用户设置
   * @param defaultValue 默认设置值
   * @returns 用户设置或默认值
   */
  getUserSettings<T>(defaultValue?: T): T | undefined {
    return this.get<T>(STORAGE_KEYS.USER_SETTINGS, defaultValue);
  },

  /**
   * 设置用户设置
   * @param settings 用户设置
   */
  setUserSettings<T>(settings: T): void {
    this.set(STORAGE_KEYS.USER_SETTINGS, settings);
  },

  /**
   * 获取侧边栏折叠状态
   * @param defaultValue 默认折叠状态
   * @returns 折叠状态
   */
  getSidebarCollapsed(defaultValue: boolean = false): boolean {
    const value = this.get<string>(STORAGE_KEYS.SIDEBAR_COLLAPSED);
    return value === "true" ? true : value === "false" ? false : defaultValue;
  },

  /**
   * 设置侧边栏折叠状态
   * @param collapsed 折叠状态
   */
  setSidebarCollapsed(collapsed: boolean): void {
    this.set(STORAGE_KEYS.SIDEBAR_COLLAPSED, String(collapsed));
  },
};
