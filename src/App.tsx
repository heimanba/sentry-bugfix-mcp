import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// 模拟 API 调用的函数
const fetchUserData = async (userId: string) => {
    // 正确：先 await fetch，再 await json()
  const response = await fetch(`https://api.example.com/user/${userId}`);
  const data = await response.json();
  console.log(data.userList);
};

function App() {
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
      <h1>Vite + React</h1>
    </>
  )
}

export default App;
