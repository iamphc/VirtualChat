import { useState, useEffect } from "react";
import { Message, VirtualCharacter, UserSettings } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

// 用于存储角色数据的localStorage键名
const STORAGE_KEY_CHARACTERS = "characters";

export const useChat = () => {
  const { t } = useLanguage();

  // 修改消息存储结构，从数组改为对象，以角色ID为键
  const [messagesByCharacter, setMessagesByCharacter] = useState<{
    [characterId: number]: Message[];
  }>({
    1: [], // 初始化每个角色的消息数组
    2: [],
    3: [],
    4: [],
  });

  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // 当前激活的角色ID
  const [activeCharacterId, setActiveCharacterId] = useState<number>(1);

  // 用户设置
  const [settings, setSettings] = useState<UserSettings | null>(null);

  // 加载用户设置
  useEffect(() => {
    const savedSettings = localStorage.getItem("userSettings");
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error("Failed to parse saved settings:", error);
      }
    }
  }, []);

  // 默认角色列表
  const defaultCharacters: VirtualCharacter[] = [
    {
      id: 1,
      name: "小助手",
      avatar: "👩‍💼",
      isActive: true,
      systemPrompt: "你是一个本地智能助手，乐于帮助用户解决各种问题。",
    },
    {
      id: 2,
      name: "数学导师",
      avatar: "👨‍🏫",
      isActive: false,
      systemPrompt: "你是一个数学导师，专长于解释数学概念和帮助解决数学问题。",
    },
    {
      id: 3,
      name: "健身教练",
      avatar: "💪",
      isActive: false,
      systemPrompt: "你是一个健身教练，专注于提供健康饮食和锻炼建议。",
    },
    {
      id: 4,
      name: "旅游顾问",
      avatar: "✈️",
      isActive: false,
      systemPrompt:
        "你是一个旅游顾问，擅长推荐旅游目的地、规划行程和提供旅行建议。",
    },
  ];

  // 虚拟人物列表，从localStorage加载或使用默认值
  const [characters, setCharacters] = useState<VirtualCharacter[]>(() => {
    try {
      const savedCharacters = localStorage.getItem(STORAGE_KEY_CHARACTERS);
      return savedCharacters ? JSON.parse(savedCharacters) : defaultCharacters;
    } catch (error) {
      console.error("Failed to parse saved characters:", error);
      return defaultCharacters;
    }
  });

  // 保存角色列表到localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CHARACTERS, JSON.stringify(characters));
  }, [characters]);

  // 添加新角色
  const addCharacter = (
    character: Omit<VirtualCharacter, "id" | "isActive">
  ) => {
    // 生成新的ID (当前最大ID + 1)
    const newId = Math.max(...characters.map((c) => c.id)) + 1;

    const newCharacter: VirtualCharacter = {
      ...character,
      id: newId,
      isActive: false,
    };

    // 更新角色列表
    setCharacters((prev) => [...prev, newCharacter]);

    // 初始化该角色的消息数组
    setMessagesByCharacter((prev) => ({
      ...prev,
      [newId]: [],
    }));

    // 添加完成后自动添加欢迎消息
    const welcomeMessage: Message = {
      id: Date.now(),
      text: t("chat.welcomeMessages.newCharacter"),
      isUser: false,
      role: "assistant",
      content: t("chat.welcomeMessages.newCharacter"),
    };

    setMessagesByCharacter((prev) => ({
      ...prev,
      [newId]: [welcomeMessage],
    }));
  };

  // 初始化欢迎消息
  useEffect(() => {
    // 检查是否已经有消息，如果没有则添加欢迎消息
    characters.forEach((character) => {
      if (messagesByCharacter[character.id]?.length === 0) {
        const welcomeMessage = getWelcomeMessageForCharacter(character);
        setMessagesByCharacter((prev) => ({
          ...prev,
          [character.id]: [welcomeMessage],
        }));
      }
    });
  }, []);

  // 根据不同角色生成欢迎消息
  const getWelcomeMessageForCharacter = (
    character: VirtualCharacter
  ): Message => {
    let welcomeText = "";

    switch (character.id) {
      case 1: // 小助手
        welcomeText = t("chat.welcomeMessages.assistant");
        break;
      case 2: // 数学导师
        welcomeText = t("chat.welcomeMessages.math");
        break;
      case 3: // 健身教练
        welcomeText = t("chat.welcomeMessages.fitness");
        break;
      case 4: // 旅游顾问
        welcomeText = t("chat.welcomeMessages.travel");
        break;
      default:
        welcomeText = t("chat.welcomeMessages.assistant");
    }

    return {
      id: Date.now(),
      text: welcomeText,
      isUser: false,
      role: "assistant",
      content: welcomeText,
    };
  };

  // 获取当前活跃角色的消息
  const currentMessages =
    activeCharacterId > 0 ? messagesByCharacter[activeCharacterId] || [] : []; // 如果没有活跃角色（activeCharacterId为0），返回空数组

  // 发送消息到API并获取回复
  const sendMessageToAPI = async (
    chatHistory: { role: string; content: string }[]
  ) => {
    // 从设置中获取模型名称，如果没有设置则使用默认值
    const modelName = settings?.textModelSettings?.model || "llama3";
    const temperature = settings?.textModelSettings?.temperature || 0.7;
    const maxTokens = settings?.textModelSettings?.maxTokens || 2000;

    // 调用Ollama API
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: modelName,
        messages: chatHistory,
        stream: false,
        options: {
          temperature: temperature,
          num_predict: maxTokens,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.message?.content || "⚠️ 无响应";
  };

  const handleSendMessage = async () => {
    // 检查是否有活跃角色和有效的输入文本
    if (!inputText.trim() || activeCharacterId <= 0) return;

    // 创建用户消息
    const newMessage: Message = {
      id: Date.now(),
      text: inputText,
      isUser: true,
      role: "user",
      content: inputText,
    };

    // 更新当前活跃角色的消息
    setMessagesByCharacter((prev) => ({
      ...prev,
      [activeCharacterId]: [...(prev[activeCharacterId] || []), newMessage],
    }));

    setInputText("");
    setLoading(true);

    try {
      // 构建消息历史，用于API请求
      const currentCharacter = characters.find(
        (c) => c.id === activeCharacterId
      );
      const chatHistory = [
        {
          role: "system",
          content: currentCharacter?.systemPrompt || "你是一个本地智能助手。",
        },
      ];

      // 将现有消息转换为Ollama API可接受的格式
      currentMessages.forEach((msg) => {
        if (msg.isUser) {
          chatHistory.push({ role: "user", content: msg.text });
        } else {
          chatHistory.push({ role: "assistant", content: msg.text });
        }
      });

      // 添加新的用户消息
      chatHistory.push({ role: "user", content: newMessage.text });

      const replyText = await sendMessageToAPI(chatHistory);

      // 创建AI回复消息
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: replyText,
        isUser: false,
        role: "assistant",
        content: replyText,
      };

      // 更新当前活跃角色的消息
      setMessagesByCharacter((prev) => ({
        ...prev,
        [activeCharacterId]: [...(prev[activeCharacterId] || []), aiResponse],
      }));
    } catch (error) {
      console.error("API请求错误:", error);

      // 获取更具体的错误信息
      let errorMessage = "请求失败，请检查 Ollama 是否运行。";

      if (error instanceof Error) {
        if (
          error.message.includes("Failed to fetch") ||
          error.message.includes("NetworkError")
        ) {
          errorMessage =
            "网络连接失败，请检查 Ollama 是否运行或网络连接是否正常。";
        } else if (error.message.includes("404")) {
          errorMessage =
            "找不到指定的模型，请检查模型是否已下载或模型名称是否正确。";
        } else if (error.message.includes("400")) {
          errorMessage = "请求参数有误，请检查请求格式。";
        } else if (error.message.includes("500")) {
          errorMessage = "服务器内部错误，请稍后重试或检查 Ollama 日志。";
        }
      }

      // 处理错误情况
      const errorResponse: Message = {
        id: Date.now() + 1,
        text: errorMessage,
        isUser: false,
        role: "assistant",
        content: errorMessage,
      };

      setMessagesByCharacter((prev) => ({
        ...prev,
        [activeCharacterId]: [
          ...(prev[activeCharacterId] || []),
          errorResponse,
        ],
      }));
    } finally {
      setLoading(false);
    }
  };

  // 重新生成消息
  const regenerateMessage = async (messageId: number) => {
    if (loading || activeCharacterId <= 0) return; // 如果已经在加载中或没有活跃角色，不再执行

    // 找到用户最后一条消息前的所有消息
    const lastUserMessageIndex = [...currentMessages]
      .reverse()
      .findIndex((msg) => msg.isUser);

    if (lastUserMessageIndex === -1) return; // 如果没有用户消息，就不能重新生成

    // 获取到最后一条用户消息为止的所有消息
    const messagesUntilLastUser = currentMessages.slice(
      0,
      currentMessages.length - lastUserMessageIndex
    );

    // 更新消息列表，移除之前的AI回复
    setMessagesByCharacter((prev) => ({
      ...prev,
      [activeCharacterId]: messagesUntilLastUser,
    }));

    setLoading(true);

    try {
      // 构建消息历史
      const currentCharacter = characters.find(
        (c) => c.id === activeCharacterId
      );
      const chatHistory = [
        {
          role: "system",
          content: currentCharacter?.systemPrompt || "你是一个本地智能助手。",
        },
      ];

      // 添加历史消息
      messagesUntilLastUser.forEach((msg) => {
        if (msg.isUser) {
          chatHistory.push({ role: "user", content: msg.text });
        } else {
          chatHistory.push({ role: "assistant", content: msg.text });
        }
      });

      const replyText = await sendMessageToAPI(chatHistory);

      // 创建新的AI回复
      const newAiResponse: Message = {
        id: Date.now(),
        text: replyText,
        isUser: false,
        role: "assistant",
        content: replyText,
      };

      // 更新消息列表
      setMessagesByCharacter((prev) => ({
        ...prev,
        [activeCharacterId]: [...messagesUntilLastUser, newAiResponse],
      }));
    } catch (error) {
      console.error("重新生成消息失败:", error);

      // 错误处理
      const errorMessage =
        error instanceof Error ? error.message : "重新生成失败，请重试。";

      const errorResponse: Message = {
        id: Date.now(),
        text: `重新生成失败: ${errorMessage}`,
        isUser: false,
        role: "assistant",
        content: `重新生成失败: ${errorMessage}`,
      };

      setMessagesByCharacter((prev) => ({
        ...prev,
        [activeCharacterId]: [...messagesUntilLastUser, errorResponse],
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && activeCharacterId > 0) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const setActiveCharacter = (id: number) => {
    // 更新当前活跃角色ID
    setActiveCharacterId(id);

    // 更新角色状态
    setCharacters(
      characters.map((char) => ({
        ...char,
        isActive: char.id === id,
      }))
    );
  };

  // 处理图像生成请求
  const handleGenerateImage = async (prompt: string): Promise<string> => {
    if (!prompt.trim()) {
      return Promise.reject("图像描述不能为空");
    }

    setIsGeneratingImage(true);

    try {
      // 这里应该调用实际的图像生成API
      // 目前我们使用一个模拟的延迟来演示功能

      return new Promise((resolve) => {
        setTimeout(() => {
          setIsGeneratingImage(false);
          // 返回一个假的图像URL作为示例
          resolve("https://example.com/generated-image.jpg");
        }, 3000);
      });
    } catch (error) {
      setIsGeneratingImage(false);
      return Promise.reject(error);
    }
  };

  // 删除角色
  const deleteCharacter = (id: number) => {
    // 移除不允许删除最后一个角色的限制

    // 如果删除的是当前活跃角色，需要先切换到另一个角色
    if (id === activeCharacterId && characters.length > 1) {
      // 找出第一个不是要删除的角色
      const nextCharacter = characters.find((char) => char.id !== id);
      if (nextCharacter) {
        setActiveCharacter(nextCharacter.id);
      }
    } else if (id === activeCharacterId) {
      // 如果是删除最后一个角色，将激活ID设为0（表示没有选中的角色）
      setActiveCharacterId(0);
    }

    // 更新角色列表
    setCharacters((prev) => prev.filter((char) => char.id !== id));

    // 删除该角色的聊天记录
    setMessagesByCharacter((prev) => {
      const newMessages = { ...prev };
      delete newMessages[id];
      return newMessages;
    });

    return true;
  };

  return {
    messagesByCharacter,
    inputText,
    setInputText,
    loading,
    isGeneratingImage,
    characters,
    currentMessages,
    handleSendMessage,
    handleKeyDown,
    setActiveCharacter,
    regenerateMessage,
    addCharacter,
    handleGenerateImage,
    deleteCharacter,
    settings,
  };
};

export default useChat;
