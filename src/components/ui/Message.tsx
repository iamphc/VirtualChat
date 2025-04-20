import React, { ReactNode, useEffect } from "react";
import { playMessageSound, setMessageSoundVolume } from "@/utils/audioUtils";

interface MessageProps {
  content: ReactNode;
  isSelf?: boolean;
  actions?: ReactNode;
  className?: string;
  playSound?: boolean;
  soundVolume?: number;
}

const Message: React.FC<MessageProps> = ({
  content,
  isSelf = false,
  actions,
  className = "",
  playSound = true,
  soundVolume = 1,
}) => {
  // 当非用户消息出现时播放提示音
  useEffect(() => {
    if (!isSelf && playSound) {
      // 设置音量并播放声音
      setMessageSoundVolume(soundVolume);
      playMessageSound();
    }
  }, [isSelf, playSound, soundVolume]);

  return (
    <div
      className={`flex flex-col ${
        isSelf ? "justify-end items-end" : "justify-start items-start"
      } ${className}`}
    >
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isSelf
            ? "bg-blue-500 dark:bg-blue-600 text-white"
            : "bg-white dark:bg-gray-700 dark:bg-opacity-70 text-gray-800 dark:text-gray-200 shadow-sm backdrop-blur-sm"
        }`}
      >
        {content}
      </div>

      {actions && <div className="mt-1">{actions}</div>}
    </div>
  );
};

export default Message;
