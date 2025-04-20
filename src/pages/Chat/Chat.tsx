import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ScrollToTop from "@/components/common/ScrollToTop";
import useChat from "./useChat";
import { useLanguage } from "@/context/LanguageContext";
import { TRANSITION } from "@/constants";

// 导入通用组件
import Sidebar from "@/components/ui/Sidebar";
import ListItem from "@/components/ui/ListItem";
import Message from "@/components/ui/Message";
import ActionButton from "@/components/ui/ActionButton";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import MessageInput from "@/components/ui/MessageInput";
import Icon from "@/components/ui/Icon";
import { VirtualCharacter } from "@/types";

// 侧边栏头部组件
const SidebarHeader = ({ collapsed }: { collapsed: boolean }) => {
  const { t } = useLanguage();

  return !collapsed ? (
    <div className="flex justify-between items-center mb-2 px-3">
      <h3 className="text-sm text-gray-400 uppercase tracking-wider whitespace-nowrap overflow-hidden">
        虚拟助手
      </h3>
      <Link
        to="/create-character"
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        title={t("characters.createWizard.title")}
      >
        <Icon type="add-circle-line" className="text-lg" />
      </Link>
    </div>
  ) : (
    <Link
      to="/create-character"
      className="w-full flex justify-center p-2 mb-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
      title={t("characters.createWizard.title")}
    >
      <Icon type="add-circle-line" className="text-lg" />
    </Link>
  );
};

// 空状态的侧边栏组件
const EmptySidebar = () => (
  <div className="text-center py-6">
    <div className="text-gray-400 mb-2">
      <Icon type="user-search-line" className="text-4xl" />
    </div>
    <p className="text-gray-500 text-sm mb-2">暂无虚拟助手</p>
    <p className="text-gray-400 text-xs">请点击顶部+号添加助手</p>
  </div>
);

// 角色列表项组件
const CharacterItem = ({
  character,
  collapsed,
  onSelect,
  onDelete,
}: {
  character: VirtualCharacter;
  collapsed: boolean;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
}) => (
  <div className="relative group">
    <ListItem
      icon={<div className="text-2xl">{character.avatar}</div>}
      label={character.name}
      isActive={character.isActive}
      onClick={() => onSelect(character.id)}
      collapsed={collapsed}
    />
    {!collapsed && (
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors z-10 w-8 h-8 flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(character.id);
        }}
        title="删除角色"
      >
        <Icon type="delete-bin-line" className="text-base" />
      </button>
    )}
  </div>
);

// 角色列表组件
const CharacterList = ({
  characters,
  collapsed,
  onSelectCharacter,
  onDeleteCharacter,
}: {
  characters: VirtualCharacter[];
  collapsed: boolean;
  onSelectCharacter: (id: number) => void;
  onDeleteCharacter: (id: number) => void;
}) => {
  return characters.length > 0 ? (
    characters.map((character) => (
      <CharacterItem
        key={character.id}
        character={character}
        collapsed={collapsed}
        onSelect={onSelectCharacter}
        onDelete={onDeleteCharacter}
      />
    ))
  ) : (
    <EmptySidebar />
  );
};

// 设置入口组件
const SettingsLink = ({
  collapsed,
  settingsLabelVisible,
  onCollapsedChange,
}: {
  collapsed?: boolean;
  settingsLabelVisible: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // 更新侧边栏折叠状态
  if (collapsed !== undefined && onCollapsedChange) {
    onCollapsedChange(collapsed);
  }

  return (
    <div
      className={`flex ${
        collapsed ? "justify-center" : "items-center"
      } cursor-pointer hover:bg-gray-700 dark:hover:bg-opacity-70 p-2 rounded-lg`}
      onClick={() => navigate("/settings")}
    >
      <div
        className="flex justify-center items-center min-w-[32px] min-h-[32px] bg-gray-600 dark:bg-opacity-50 text-lg rounded-full transition-all duration-200"
        style={{ marginRight: collapsed ? 0 : "0.75rem" }}
      >
        👤
      </div>
      {!collapsed && (
        <div
          className={`transition-opacity duration-200 ${
            settingsLabelVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {t("settings.title")}
        </div>
      )}
    </div>
  );
};

// 消息操作按钮组件
const MessageActions = ({
  messageId,
  text,
  copiedMessageId,
  regeneratingId,
  onCopy,
  onRegenerate,
  disabled,
}: {
  messageId: number;
  text: string;
  copiedMessageId: number | null;
  regeneratingId: number | null;
  onCopy: (text: string, messageId: number) => void;
  onRegenerate: (messageId: number) => void;
  disabled: boolean;
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex self-start max-w-[70%] justify-end space-x-4 text-gray-500 dark:text-gray-400">
      <ActionButton
        icon={
          <Icon
            type={
              copiedMessageId === messageId ? "check-line" : "file-copy-line"
            }
            className={`${
              copiedMessageId === messageId ? "text-green-500" : ""
            } text-lg`}
          />
        }
        tooltip={
          copiedMessageId === messageId ? t("chat.copied") : t("chat.copy")
        }
        onClick={() => onCopy(text, messageId)}
      />

      <ActionButton
        icon={
          <Icon
            type={
              regeneratingId === messageId ? "loader-4-line" : "refresh-line"
            }
            className={`${
              regeneratingId === messageId ? "animate-spin" : ""
            } text-lg`}
          />
        }
        tooltip={
          regeneratingId === messageId
            ? t("chat.regenerating")
            : t("chat.regenerate")
        }
        onClick={() => onRegenerate(messageId)}
        disabled={disabled || regeneratingId !== null}
      />
    </div>
  );
};

// 消息列表组件
const MessageList = ({
  messages,
  loading,
  settings,
  copiedMessageId,
  regeneratingId,
  onCopyMessage,
  onRegenerateMessage,
}: {
  messages: any[];
  loading: boolean;
  settings: any;
  copiedMessageId: number | null;
  regeneratingId: number | null;
  onCopyMessage: (text: string, messageId: number) => void;
  onRegenerateMessage: (messageId: number) => void;
}) => (
  <div
    id="chat-messages"
    className="flex-1 overflow-y-auto p-4 px-6 space-y-4 bg-gray-100 dark:bg-opacity-40"
  >
    {messages.map((message) => (
      <Message
        key={message.id}
        content={message.text}
        isSelf={message.isUser}
        actions={
          !message.isUser ? (
            <MessageActions
              messageId={message.id}
              text={message.text}
              copiedMessageId={copiedMessageId}
              regeneratingId={regeneratingId}
              onCopy={onCopyMessage}
              onRegenerate={onRegenerateMessage}
              disabled={loading}
            />
          ) : undefined
        }
        playSound={settings?.notifications?.sound !== false}
        soundVolume={settings?.notifications?.volume || 1}
      />
    ))}

    {loading && (
      <div className="flex justify-start">
        <div className="bg-white dark:bg-gray-700 dark:bg-opacity-70 text-gray-800 dark:text-gray-200 shadow-sm max-w-[70%] rounded-lg p-3 backdrop-blur-sm">
          <LoadingIndicator />
        </div>
      </div>
    )}
  </div>
);

// 空状态聊天区域
const EmptyChatArea = () => (
  <div className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-opacity-40">
    <div className="text-center p-8 max-w-md">
      <div className="text-gray-400 mb-4">
        <Icon type="robot-line" className="text-6xl" />
      </div>
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
        欢迎使用智能聊天助手
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-2">
        请先创建一个虚拟助手开始聊天
      </p>
      <p className="text-gray-400 text-sm">
        点击左上角
        <Icon type="add-circle-line" className="mx-1" />
        添加助手
      </p>
    </div>
  </div>
);

// 删除确认对话框组件
const DeleteConfirmDialog = ({
  characterId,
  characters,
  onCancel,
  onConfirm,
}: {
  characterId: number;
  characters: VirtualCharacter[];
  onCancel: () => void;
  onConfirm: (id: number) => void;
}) => {
  const character = characters.find((c) => c.id === characterId);
  if (!character) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full shadow-xl">
        <h3 className="text-lg font-medium mb-4 dark:text-white">确认删除</h3>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          确定要删除角色"{character.name}
          "吗？该操作将同时删除与该角色的所有聊天记录，且不可恢复。
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={onCancel}
          >
            取消
          </button>
          <button
            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={() => onConfirm(characterId)}
          >
            删除
          </button>
        </div>
      </div>
    </div>
  );
};

// 主Chat组件
const Chat: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const {
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
    handleGenerateImage,
    deleteCharacter,
    settings,
  } = useChat();

  const [copiedMessageId, setCopiedMessageId] = useState<number | null>(null);
  const [regeneratingId, setRegeneratingId] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(
    null
  );
  const [settingsLabelVisible, setSettingsLabelVisible] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // 处理设置标签可见性
  useEffect(() => {
    if (sidebarCollapsed) {
      setSettingsLabelVisible(false);
    } else {
      const timer = setTimeout(() => {
        setSettingsLabelVisible(true);
      }, TRANSITION.SIDEBAR_EXPAND_DELAY);
      return () => clearTimeout(timer);
    }
  }, [sidebarCollapsed]);

  // 复制文本到剪贴板
  const copyToClipboard = (text: string, messageId: number) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("文本已复制到剪贴板");
        setCopiedMessageId(messageId);
        setTimeout(() => setCopiedMessageId(null), 2000); // 2秒后隐藏提示
      })
      .catch((err) => {
        console.error("复制失败: ", err);
      });
  };

  // 处理重新生成消息
  const handleRegenerate = (messageId: number) => {
    setRegeneratingId(messageId);
    regenerateMessage(messageId).finally(() => {
      setRegeneratingId(null);
    });
  };

  // 处理删除角色
  const handleDeleteCharacter = (id: number) => {
    console.log("删除角色，ID:", id);
    const success = deleteCharacter(id);
    if (success) {
      setShowDeleteConfirm(null);
    }
  };

  // 打开删除确认对话框
  const openDeleteConfirm = (id: number) => {
    console.log("打开删除确认对话框，角色ID:", id);
    setShowDeleteConfirm(id);
  };

  // 更新侧边栏折叠状态
  const handleSidebarCollapsedChange = (collapsed: boolean) => {
    if (collapsed !== sidebarCollapsed) {
      setSidebarCollapsed(collapsed);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* 左侧边栏 */}
      <Sidebar
        title={t("chat.title")}
        footer={({ collapsed }) => (
          <SettingsLink
            collapsed={collapsed}
            settingsLabelVisible={settingsLabelVisible}
            onCollapsedChange={handleSidebarCollapsedChange}
          />
        )}
        className="w-64"
      >
        {({ collapsed }) => (
          <div className="p-2">
            <SidebarHeader collapsed={collapsed} />
            <CharacterList
              characters={characters}
              collapsed={collapsed}
              onSelectCharacter={setActiveCharacter}
              onDeleteCharacter={openDeleteConfirm}
            />
          </div>
        )}
      </Sidebar>

      {/* 右侧聊天区域 */}
      <div className="flex-1 flex flex-col h-full">
        {characters.length > 0 ? (
          <>
            <MessageList
              messages={currentMessages}
              loading={loading}
              settings={settings}
              copiedMessageId={copiedMessageId}
              regeneratingId={regeneratingId}
              onCopyMessage={copyToClipboard}
              onRegenerateMessage={handleRegenerate}
            />

            {/* 输入框区域 */}
            <div className="border-t dark:border-gray-700 dark:border-opacity-20 py-4 px-6 dark:backdrop-blur-xl">
              <MessageInput
                value={inputText}
                onChange={setInputText}
                onSend={handleSendMessage}
                onKeyDown={handleKeyDown}
                disabled={loading || characters.length === 0}
                placeholder={
                  characters.length === 0
                    ? "请先创建一个助手..."
                    : t("chat.placeholder")
                }
                buttonText={loading ? t("chat.sending") : t("chat.send")}
                onGenerateImage={handleGenerateImage}
                isGeneratingImage={isGeneratingImage}
              />
            </div>

            <ScrollToTop containerSelector="#chat-messages" threshold={300} />
          </>
        ) : (
          <EmptyChatArea />
        )}
      </div>

      {/* 删除确认对话框 */}
      {showDeleteConfirm !== null && (
        <DeleteConfirmDialog
          characterId={showDeleteConfirm}
          characters={characters}
          onCancel={() => {
            console.log("取消删除");
            setShowDeleteConfirm(null);
          }}
          onConfirm={(id) => {
            console.log("确认删除，ID:", id);
            handleDeleteCharacter(id);
          }}
        />
      )}
    </div>
  );
};

export default Chat;
