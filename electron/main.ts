import { app, BrowserWindow, dialog, ipcMain } from "electron";
import path from "path";
import fs from "fs";
import { exec } from "child_process";
import { LocalModel } from "../src/types";

// 是否为开发环境
const isDev = process.env.NODE_ENV === "development";
console.log("当前环境:", isDev ? "开发环境" : "生产环境");

// 在开发环境下启用热重载
if (isDev) {
  try {
    require("electron-reloader")(module, {
      debug: true,
      watchRenderer: true,
    });
    console.log("已启用 electron-reloader 热重载");
  } catch (err) {
    console.error("无法启用electron-reloader热重载:", err);
  }
}

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  // 预加载脚本的完整路径（使用path.resolve确保路径正确）
  const preloadPath = path.resolve(__dirname, "preload.js");
  console.log("预加载脚本路径:", preloadPath);

  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: preloadPath,
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: !isDev, // 开发环境下禁用web安全性以允许本地文件访问
    },
  });

  // 加载应用
  if (isDev) {
    console.log("加载开发服务器 URL: http://localhost:5173");
    // 开发环境：连接到开发服务器
    mainWindow.loadURL("http://localhost:5173");
    // 打开开发者工具
    mainWindow.webContents.openDevTools();
  } else {
    // 生产环境：加载打包后的文件
    console.log("加载生产环境文件:", path.join(__dirname, "../index.html"));
    mainWindow.loadFile(path.join(__dirname, "../index.html"));
  }

  // 窗口关闭时清除引用
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// 注册IPC处理函数
function setupIPC() {
  console.log("设置IPC处理函数...");

  // 选择目录
  ipcMain.handle("select-directory", async () => {
    console.log("收到select-directory请求");

    if (!mainWindow) {
      console.error("错误: 主窗口未创建，无法打开对话框");
      return { canceled: true, error: "主窗口未创建" };
    }

    try {
      console.log("打开目录选择对话框...");
      const result = await dialog.showOpenDialog(mainWindow, {
        properties: ["openDirectory"],
        title: "选择本地模型目录",
      });

      console.log("目录选择结果:", result);
      return result;
    } catch (error) {
      console.error("打开目录选择对话框失败:", error);
      return {
        canceled: true,
        error: error instanceof Error ? error.message : "未知错误",
      };
    }
  });

  // 扫描模型
  ipcMain.handle("scan-models", async (_, modelPath: string) => {
    try {
      if (!fs.existsSync(modelPath)) {
        throw new Error(`目录不存在: ${modelPath}`);
      }

      const files = fs.readdirSync(modelPath);

      // 模型文件应该是具有特定扩展名的文件，这里假设我们寻找 .bin 文件或没有扩展名的文件
      const modelFiles = files.filter((file) => {
        const filePath = path.join(modelPath, file);
        const stats = fs.statSync(filePath);

        // 如果是目录，则返回true
        if (stats.isDirectory()) return true;

        // 如果是文件，检查扩展名
        const ext = path.extname(file).toLowerCase();
        return (
          ext === ".bin" || ext === ".gguf" || ext === ".ggml" || ext === ""
        );
      });

      // 转换为LocalModel对象数组
      const models: LocalModel[] = modelFiles.map((file) => {
        const filePath = path.join(modelPath, file);
        const isDirectory = fs.statSync(filePath).isDirectory();

        return {
          id: file,
          name: file,
          path: isDirectory ? filePath : path.join(modelPath, file),
        };
      });

      return models;
    } catch (error) {
      console.error("扫描模型错误:", error);
      throw error;
    }
  });

  // 启动模型
  ipcMain.handle("start-model", async (_, model: LocalModel) => {
    try {
      // 这里需要根据实际的模型启动方式进行调整
      // 示例：调用外部程序或脚本启动模型服务器

      console.log(`启动模型: ${model.name}，路径: ${model.path}`);

      // 简单示例：如果使用Ollama，可以执行类似的命令（这里只是示意，实际需要根据具体环境调整）
      return new Promise((resolve, reject) => {
        const command = `ollama run ${model.id}`;

        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`执行命令错误: ${error}`);
            return reject(error);
          }

          console.log(`命令输出: ${stdout}`);
          if (stderr) {
            console.error(`命令错误输出: ${stderr}`);
          }

          resolve({ success: true, message: "模型启动成功" });
        });
      });
    } catch (error) {
      console.error("启动模型错误:", error);
      throw error;
    }
  });
}

// 应用准备就绪时创建窗口
app.whenReady().then(() => {
  createWindow();
  setupIPC();

  // 在macOS上，当点击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 当所有窗口关闭时退出应用（Windows & Linux）
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
