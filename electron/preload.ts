import { contextBridge, ipcRenderer } from "electron";

console.log("预加载脚本正在执行...");

// 安全地暴露ipcRenderer给渲染进程
contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    invoke: (channel: string, ...args: any[]) => {
      console.log(`调用IPC通道: ${channel}`, args);
      // 白名单渠道
      const validChannels = ["select-directory", "scan-models", "start-model"];
      if (validChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, ...args);
      }
      throw new Error(`不允许访问该IPC通道: ${channel}`);
    },
  },
});

console.log("预加载脚本完成，electron对象已暴露");
