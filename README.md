# Electron React App

[![GitHub stars](https://img.shields.io/github/stars/yourusername/electron-react-app.svg?style=social&label=Star&maxAge=2592000)](https://github.com/yourusername/electron-react-app/stargazers)

A desktop application built with Electron, React, and TypeScript for interacting with various AI models (text, speech, and image generation). This application provides a user-friendly interface for communicating with local AI models.

## Features

- Modern UI with Tailwind CSS
- Dark/Light mode support
- Multi-language support
- Chat interface for text models
- Support for local AI models
- Character creation and customization

## Tech Stack

- Electron: Cross-platform desktop app framework
- React: UI library
- TypeScript: Type-safe JavaScript
- Vite: Build tool and development server
- Tailwind CSS: Utility-first CSS framework

## Getting Started

### Prerequisites

- Node.js (>= 18)
- pnpm package manager

### Installation

```shell
# Clone the repository
git clone https://github.com/yourusername/electron-react-app.git
cd electron-react-app

# Install dependencies
pnpm install

# Development
pnpm dev

# Build
pnpm build

# Package the app
pnpm package
```

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
