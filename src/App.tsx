import { useState } from 'react'
import * as Sentry from '@sentry/react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// 获取 Sentry logger
const { logger } = Sentry;

// 一个会抛出错误的函数
const throwError = () => {
  throw new Error('这是一个测试错误');
};

// 一个会产生未处理 Promise 拒绝的函数
const causeUnhandledRejection = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('未处理的 Promise 拒绝'));
    }, 100);
  });
};

// 模拟 API 调用的函数
const fetchUserData = async (userId: string) => {
    // 正确：先 await fetch，再 await json()
  const response = await fetch(`https://api.example.com/user/${userId}`);
  const data = await response.json();
  console.log(data.userList);
};

function App() {
  const [count, setCount] = useState(0)
  const [error, setError] = useState<string | null>(null)

  // 处理按钮点击，增加计数
  const handleIncrement = () => {
    Sentry.startSpan(
      {
        op: "ui.click",
        name: "增加计数按钮点击",
      },
      (span) => {
        // 添加自定义属性到 span
        span.setAttribute("previousCount", count);
        
        setCount((count) => count + 1);
        
        // 记录一个信息日志
        logger.info(logger.fmt`计数增加到 ${count + 1}`);
      },
    );
  };

  // 触发一个捕获的错误
  const handleCaughtError = () => {
    // try {
      // 尝试访问一个不存在的属性
      const obj = null;
      // @ts-expect-error - 故意触发错误
      console.log(obj.property);
    // } catch (err: unknown) {
    //   // 捕获并上报错误
    //   Sentry.captureException(err);
    //   setError('捕获到一个错误并已上报到 Sentry');
      
    //   // 记录错误日志
    //   logger.error("捕获到一个错误", { error: String(err) });
      
    //   // 3秒后清除错误消息
    //   setTimeout(() => setError(null), 3000);
    // }
  };

  // 触发一个未捕获的错误
  const handleUncaughtError = () => {
    throwError();
  };

  // 触发一个未处理的 Promise 拒绝
  const handleUnhandledRejection = () => {
    causeUnhandledRejection();
    setError('触发了一个未处理的 Promise 拒绝');
    setTimeout(() => setError(null), 3000);
  };

  // 模拟 API 调用
  const handleApiCall = async () => {
    try {
      const userId = `user_${Math.floor(Math.random() * 1000)}`;
      const data = await fetchUserData(userId);
      logger.info("成功获取用户数据", { userId, data });
      setError(`API 调用成功: ${JSON.stringify(data)}`);
      setTimeout(() => setError(null), 3000);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_err) {
      setError('API 调用失败，错误已上报');
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Sentry</h1>
      <div className="card">
        <button onClick={handleIncrement}>
          计数: {count}
        </button>
        
        <div style={{ marginTop: '20px' }}>
          <button onClick={handleCaughtError} style={{ marginRight: '10px' }}>
            触发已捕获错误
          </button>
          
          <button onClick={handleUncaughtError} style={{ marginRight: '10px' }}>
            触发未捕获错误
          </button>
          
          <button onClick={handleUnhandledRejection} style={{ marginRight: '10px' }}>
            触发 Promise 拒绝
          </button>
          
          <button onClick={handleApiCall}>
            模拟 API 调用
          </button>
        </div>
        
        {error && (
          <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f8d7da', borderRadius: '4px' }}>
            {error}
          </div>
        )}
        
        <p style={{ marginTop: '20px' }}>
          编辑 <code>src/App.tsx</code> 并保存以测试 HMR
        </p>
      </div>
      <p className="read-the-docs">
        点击 Vite 和 React 图标了解更多
      </p>
    </>
  )
}

// 使用 Sentry 包装导出的组件
export default App;
