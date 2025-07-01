# 项目概述

## 项目简介

这是一个基于 React + TypeScript + Vite 的前端项目，主要用于演示和修复前端异常问题的 POC（概念验证）项目。项目使用了最新的 React 19 版本，配置了完整的开发环境。

## 技术栈

- **前端框架**: React 19.1.0
- **开发语言**: TypeScript 5.8.3
- **构建工具**: Vite 7.0.0
- **代码规范**: ESLint 9.29.0
- **监控**: 集成了阿里云 RUM（实时用户监控）

## 项目结构

### 根目录
```
bugfix-mcp-poc/
├── design/                    # 设计文档目录
├── design-prompt/             # 设计提示文档
│   ├── 1.overview.md         # 项目概述需求
│   └── 2.design.md           # 设计需求文档
├── public/                    # 静态资源
│   └── vite.svg              # Vite 图标
├── src/                       # 源代码目录
└── 配置文件...
```

### src/ 源代码目录结构
```
src/
├── main.tsx                   # 应用入口文件
├── App.tsx                    # 主应用组件
├── App.css                    # 应用样式
├── index.css                  # 全局样式
├── vite-env.d.ts             # Vite 类型定义
├── assets/                    # 静态资源
│   └── react.svg             # React 图标
├── components/                # 组件目录（暂时为空）
└── utils/                     # 工具函数目录（暂时为空）
```

## 模块分析

### 核心模块

1. **主应用模块** (`src/App.tsx`)
   - 包含了一个模拟的 API 调用函数 `fetchUserData`
   - 展示了 Vite 和 React 的 logo
   - 作为应用的主要入口组件

2. **入口模块** (`src/main.tsx`)
   - 使用 React 18+ 的 `createRoot` API
   - 启用了 `StrictMode` 进行开发调试

3. **样式模块**
   - `App.css`: 应用级样式
   - `index.css`: 全局样式

### 预留模块
- `components/`: 组件模块目录（当前为空）
- `utils/`: 工具函数模块目录（当前为空）

## 依赖管理

### 生产依赖
```json
{
  "react": "^19.1.0",           # React 核心库
  "react-dom": "^19.1.0"        # React DOM 渲染器
}
```

### 开发依赖
```json
{
  "@eslint/js": "^9.29.0",                      # ESLint 核心
  "@types/react": "^19.1.8",                    # React 类型定义
  "@types/react-dom": "^19.1.6",                # React DOM 类型定义
  "@vitejs/plugin-react": "^4.5.2",             # Vite React 插件
  "eslint": "^9.29.0",                          # 代码检查工具
  "eslint-plugin-react-hooks": "^5.2.0",        # React Hooks 规则
  "eslint-plugin-react-refresh": "^0.4.20",     # React 热更新规则
  "globals": "^16.2.0",                         # 全局变量定义
  "typescript": "~5.8.3",                       # TypeScript 编译器
  "typescript-eslint": "^8.34.1",               # TypeScript ESLint 规则
  "vite": "^7.0.0"                              # 构建工具
}
```

## 配置文件

- `package.json`: 项目配置和依赖管理
- `vite.config.ts`: Vite 构建配置
- `tsconfig.json`: TypeScript 基础配置
- `tsconfig.app.json`: 应用级 TypeScript 配置
- `tsconfig.node.json`: Node.js 环境 TypeScript 配置
- `eslint.config.js`: ESLint 代码规范配置

## 特殊功能

1. **监控集成**: 项目集成了阿里云 RUM 监控，可以实时监控前端性能和异常
2. **异常处理**: 从设计文档可以看出，这个项目专注于前端异常问题的演示和修复
3. **开发体验**: 配置了完整的 TypeScript + ESLint 开发环境，支持热更新

## 运行脚本

- `npm run dev`: 启动开发服务器
- `npm run build`: 构建生产版本
- `npm run lint`: 代码检查
- `npm run preview`: 预览构建结果

## 项目状态

当前项目处于初始化阶段，主要框架已搭建完成，但核心业务功能（前端异常处理相关）尚未实现。`components/` 和 `utils/` 目录为空，等待后续功能开发。