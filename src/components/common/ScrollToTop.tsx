import React, { useState, useEffect, useRef } from "react";

interface ScrollToTopProps {
  threshold?: number; // 显示按钮的滚动阈值
  smooth?: boolean; // 是否使用平滑滚动
  containerSelector?: string; // 容器选择器，如果提供则监听该容器的滚动
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({
  threshold = 300,
  smooth = true,
  containerSelector,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  // 获取滚动容器
  useEffect(() => {
    if (containerSelector) {
      containerRef.current = document.querySelector(containerSelector);
    }
  }, [containerSelector]);

  // 监听滚动事件，决定按钮是否可见
  useEffect(() => {
    const toggleVisibility = () => {
      // 如果有指定容器，则检查容器的滚动位置，否则检查窗口滚动位置
      if (containerRef.current) {
        setIsVisible(containerRef.current.scrollTop > threshold);
      } else {
        setIsVisible(window.scrollY > threshold);
      }
    };

    // 根据是否有容器选择器，添加不同的事件监听
    const scrollTarget = containerRef.current || window;
    scrollTarget.addEventListener("scroll", toggleVisibility);

    // 组件卸载时移除事件监听
    return () => {
      scrollTarget.removeEventListener("scroll", toggleVisibility);
    };
  }, [threshold, containerSelector]);

  // 回到顶部的处理函数
  const scrollToTop = () => {
    if (containerRef.current) {
      // 容器内滚动
      if (smooth) {
        containerRef.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        containerRef.current.scrollTop = 0;
      }
    } else {
      // 整个窗口滚动
      if (smooth) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        window.scrollTo(0, 0);
      }
    }
  };

  // 如果不可见则不渲染
  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none z-50 transition-all duration-300"
      aria-label="回到顶部"
    >
      <i className="ri-arrow-up-line text-xl"></i>
    </button>
  );
};

export default ScrollToTop;
