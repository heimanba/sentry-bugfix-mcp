import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/react'
import './index.css'
import App from './App.tsx'

// 初始化 Sentry
Sentry.init({
  dsn: "https://0f132b2a225fc939bf9f464a58a53c5f@o4509578911088640.ingest.us.sentry.io/4509578989731840",
  sendDefaultPii: true,
  integrations: [
    // 将 console.log, console.error, 和 console.warn 作为日志发送到 Sentry
    Sentry.consoleLoggingIntegration({ levels: ["log", "error", "warn"] }),
  ],
  // 启用日志
  _experiments: {
    enableLogs: true,
  },
  beforeSend(event, hint) {
    const error = hint.originalException as Error;
    const testErrorMessages = [
      "Cannot read properties of null (reading 'property')",
      '未处理的 Promise 拒绝',
      '这是一个测试错误'
    ];

    if (error && error.message && testErrorMessages.includes(error.message)) {
      return null; // Discard the event
    }
    return event; // Send other events
  }
});

// 获取 Sentry logger
const { logger } = Sentry;

// 记录应用启动的日志
logger.info("应用启动", { environment: import.meta.env.MODE });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
