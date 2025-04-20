### Text Models

```shell
# Start the service, listening address: 127.0.0.1:11434
# Model link: https://ollama.com/library/llama3
ollama serve
# Run the model
ollama run llama3
```

### Speech Models

### Image Models

```shell
# Go to web-ui repository
# Location for models: /var/www/stable-diffusion-webui/models/Stable-diffusion
# Current model in use: v1-5-pruned-emaonly.safetensors
# Reference link: https://huggingface.co/stable-diffusion-v1-5/stable-diffusion-v1-5/tree/main
cd /var/www/stable-diffusion-webui
# Run web-ui, make sure to disable proxy before starting, otherwise it will cause errors
python launch.py --skip-torch-cuda-test --api
# After startup, service API doc: http://127.0.0.1:7860/docs
```

### FAQ

Q: `pnpm dev` gives an error, suggesting to reinstall electron?

A:

```shell
pnpm install
node node_modules/electron/install.js
pnpm dev
```
