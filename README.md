### 文本模型

```shell
# 启动服务, 监听地址：127.0.0.1:11434
# 模型链接：https://ollama.com/library/llama3
ollama serve
# 运行模型
ollama run llama3
```

### 语音模型

### 图像模型

```shell
# 去web-ui的仓库
# 使用模型的位置：/var/www/stable-diffusion-webui/models/Stable-diffusion
# 当前使用的模型：v1-5-pruned-emaonly.safetensors
# 参考链接：https://huggingface.co/stable-diffusion-v1-5/stable-diffusion-v1-5/tree/main
cd /var/www/stable-diffusion-webui
# 运行web-ui，注意不要启动前关闭代理，否则会报错
python launch.py --skip-torch-cuda-test --api
# 启动后，服务接口doc：http://127.0.0.1:7860/docs
```
