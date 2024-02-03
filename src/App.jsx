import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/HomePage/HomePage'
import ExpensesPage from './pages/ExpensesPage/ExpensesPage'
import './App.css'

const App = () => {
  const [token, setToken] = useState(null)
  useEffect(() => {
    // 在這裡檢查是否有有效的 token，並將結果存儲在 state 中
    const userToken = localStorage.getItem('userToken')
    setToken(userToken)
  }, [])

  const PrivateRoute = ({ element, ...rest }) => {
    // 如果有有效的 token，渲染元素，否則重新導向到登入頁面
    return token
      ? (
          element
        )
      : (
        <Navigate to="/" replace={true} />
        )
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/expenses" element={<PrivateRoute element={<ExpensesPage />} />} />
          {/* 其他路由 */}
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
