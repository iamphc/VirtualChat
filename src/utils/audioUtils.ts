/**
 * 音频工具类 - 处理消息通知声音
 */

// 存储预加载的音频对象
const audioCache: Record<string, HTMLAudioElement> = {};

// 默认消息音效
const DEFAULT_MESSAGE_SOUND = "/sounds/message.mp3";

/**
 * 预加载音频文件
 * @param url 音频文件路径
 * @returns HTMLAudioElement实例
 */
export const preloadAudio = (url: string): HTMLAudioElement => {
  if (!audioCache[url]) {
    const audio = new Audio(url);
    audio.load();
    audioCache[url] = audio;
  }
  return audioCache[url];
};

/**
 * 播放消息通知声音
 * @param sound 可选，自定义声音URL
 */
export const playMessageSound = (sound?: string): void => {
  try {
    const audioUrl = sound || DEFAULT_MESSAGE_SOUND;

    // 尝试从缓存获取或创建新的Audio实例
    let audio = audioCache[audioUrl];
    if (!audio) {
      audio = preloadAudio(audioUrl);
    }

    // 重置音频并播放
    audio.currentTime = 0;

    // 播放声音（返回一个Promise以便于错误处理）
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.error("播放消息声音失败:", error);
      });
    }
  } catch (error) {
    console.error("播放消息声音时出错:", error);
  }
};

/**
 * 设置消息声音音量
 * @param volume 音量值 (0-1)
 * @param sound 可选，自定义声音URL
 */
export const setMessageSoundVolume = (volume: number, sound?: string): void => {
  const audioUrl = sound || DEFAULT_MESSAGE_SOUND;
  let audio = audioCache[audioUrl];

  if (!audio) {
    audio = preloadAudio(audioUrl);
  }

  // 确保音量在有效范围内
  const safeVolume = Math.max(0, Math.min(1, volume));
  audio.volume = safeVolume;
};
