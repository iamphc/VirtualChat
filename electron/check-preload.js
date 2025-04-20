const fs = require("fs");
const path = require("path");

// 检查预加载脚本是否存在
function checkPreloadScript() {
  const distDir = path.join(__dirname, "../dist/electron");
  const preloadPath = path.join(distDir, "preload.js");

  console.log("正在检查预加载脚本..."); 
  console.log("预期路径:", preloadPath);

  if (!fs.existsSync(distDir)) {
    console.error("错误: dist/electron 目录不存在!");
    fs.mkdirSync(distDir, { recursive: true });
    console.log("已创建 dist/electron 目录");
  }

  if (!fs.existsSync(preloadPath)) {
    console.error("错误: preload.js 不存在于预期位置!");

    // 尝试编译preload.ts
    console.log("尝试编译 preload.ts...");
    const { execSync } = require("child_process");
    try {
      execSync("tsc -p electron/tsconfig.json", { stdio: "inherit" });
      console.log("预加载脚本编译完成");
    } catch (error) {
      console.error("编译失败:", error);
    }

    // 再次检查
    if (fs.existsSync(preloadPath)) {
      console.log("预加载脚本现已存在于:", preloadPath);
    } else {
      console.error("编译后仍未找到预加载脚本");
    }
  } else {
    console.log("预加载脚本存在于:", preloadPath);
  }
}

checkPreloadScript();
