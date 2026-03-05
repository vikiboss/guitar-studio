# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # 启动开发服务器
pnpm build      # 类型检查 + 构建生产包 (tsc && vite build)
pnpm preview    # 预览生产构建结果
```

> 包管理器：pnpm

## Architecture

**Guitar Studio** 是一个吉他在线工具集，基于 React 18 + TypeScript + Vite 构建。

### 技术栈

- **UI 框架**：React 18，组件库使用 Geist UI
- **样式**：UnoCSS（utility-first），支持深色模式（CSS class 切换）
- **状态管理**：Valtio（响应式 proxy），封装在 `src/utils/create-store.ts`
- **路由**：React Router v6（browser history）
- **国际化**：i18next，支持 en / ja / zh-CN / zh-TW，翻译文件在 `src/i18n/locales/`
- **音频**：Pitchy（音高检测）、Tone.js（合成器）、Teoria（乐理计算）

### 目录结构说明

```
src/
├── components/   # 通用 UI 组件（NavBar、Icon 等）
├── hooks/        # 自定义 Hooks（主题、路由、生命周期等）
├── pages/        # 路由页面，每个页面含 index.tsx + store.ts
├── i18n/         # 国际化配置和翻译文件
├── router/       # React Router 路由配置
├── store/        # 全局状态（Valtio）
└── utils/        # 工具函数、类型定义、和弦数据库
```

### 状态管理模式

使用 `src/utils/create-store.ts` 的工厂函数创建 Valtio store：

```ts
// 读取状态
const state = store.useState()
// 修改状态
store.mutate.someField = value
```

每个页面有自己独立的 `store.ts`，全局状态在 `src/store/index.ts`。

### 路径别名

`@/*` 映射到 `./src/*`，例如 `import { xxx } from '@/utils'`。

### 功能状态

| 功能 | 状态 |
|------|------|
| 调音器 (Tuner) | 已实现 |
| 和弦浏览器 (Chords) | 已实现 |
| 节拍器 (Metronome) | 开发中 |
| 谱面 (Tablature) | 规划中 |
| 耳训练 (Ear Training) | 规划中 |
