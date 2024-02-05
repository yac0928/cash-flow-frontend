import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/HomePage/HomePage'
import ExpensesPage from './pages/ExpensesPage/ExpensesPage'
import ExpensePage from './pages/ExpensePage/ExpensePage'
import EditExpensePage from './pages/EditExpensePage/EditExpensePage'
import './App.css'

const App = () => {
  const [token, setToken] = useState(null)
  useEffect(() => {
    // 在這裡檢查是否有有效的 token，並將結果存儲在 state 中
    const userToken = localStorage.getItem('Token')
    setToken(userToken)
  }, [])

  const PrivateRoute = ({ element, ...rest }) => {
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
          <Route path="/expenses/:id" element={<PrivateRoute element={<ExpensePage />} />} />
          <Route path="/expenses/:id/edit" element={<PrivateRoute element={<EditExpensePage />} />} />

          {/* 其他路由 */}
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
