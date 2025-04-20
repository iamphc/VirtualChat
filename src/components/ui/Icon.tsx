import React from "react";
import * as Icons from "./icons/index";

interface IconProps {
  type: string;
  className?: string;
  size?: number;
  onClick?: () => void;
}

/**
 * 自定义图标组件，使用SVG图标替代remixicon
 * 更轻量级，只包含应用中使用的图标
 */
const Icon: React.FC<IconProps> = ({
  type,
  className = "",
  size = 24,
  onClick,
}) => {
  const iconType = type.replace("-line", "");

  // 映射图标类型到SVG组件
  const iconMap: Record<string, React.ReactNode> = {
    "add-circle": (
      <Icons.AddCircleIcon
        className={className}
        size={size}
        onClick={onClick}
      />
    ),
    "delete-bin": (
      <Icons.DeleteIcon className={className} size={size} onClick={onClick} />
    ),
    "user-search": (
      <Icons.UserSearchIcon
        className={className}
        size={size}
        onClick={onClick}
      />
    ),
    check: (
      <Icons.CheckIcon className={className} size={size} onClick={onClick} />
    ),
    "file-copy": (
      <Icons.CopyIcon className={className} size={size} onClick={onClick} />
    ),
    "loader-4": (
      <Icons.LoaderIcon className={className} size={size} onClick={onClick} />
    ),
    refresh: (
      <Icons.RefreshIcon className={className} size={size} onClick={onClick} />
    ),
    robot: (
      <Icons.RobotIcon className={className} size={size} onClick={onClick} />
    ),
    "arrow-up": (
      <Icons.ArrowUpIcon className={className} size={size} onClick={onClick} />
    ),
    "image-add": (
      <Icons.ImageAddIcon className={className} size={size} onClick={onClick} />
    ),
    "arrow-left-s": (
      <Icons.ArrowLeftIcon
        className={className}
        size={size}
        onClick={onClick}
      />
    ),
    "arrow-right-s": (
      <Icons.ArrowRightIcon
        className={className}
        size={size}
        onClick={onClick}
      />
    ),
  };

  return iconMap[iconType] || <span className={className}>图标未找到</span>;
};

export default Icon;
