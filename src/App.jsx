import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/HomePage/HomePage'
import ExpensesPage from './pages/ExpensesPage/ExpensesPage'
import ExpensesByMonthPage from './pages/ExpensesByMonthPage/ExpensesByMonthPage'
import ExpensePage from './pages/ExpensePage/ExpensePage'
import EditExpensePage from './pages/EditExpensePage/EditExpensePage'
import PostExpensePage from './pages/PostExpensePage/PostExpensePage'
import MoviesPage from './pages/MoviesPage/MoviesPage'
import './App.css'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('Token')))
  const [mode, setMode] = useState(localStorage.getItem('mode') || 'cash-flow')

  // 當 mode 狀態發生變化時，將其保存到 localStorage 中
  useEffect(() => {
    localStorage.setItem('mode', mode)
  }, [mode])
  useEffect(() => {
    if (mode === 'cash-flow') {
      document.documentElement.style.setProperty('--background-color', '#aed9e0')
    } else if (mode === 'movies') {
      document.documentElement.style.setProperty('--background-color', '#CCCCCC')
    }
  }, [mode])
  return (
    <div className={mode === 'cash-flow' ? 'cash-flow-mode' : 'movies-mode'}>
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} mode={mode} />
        <Routes>
          <Route path="/expenses/new" element={isAuthenticated ? <PostExpensePage /> : <Navigate to="/" />} />
          <Route path="/expenses/:id" element={isAuthenticated ? <ExpensePage /> : <Navigate to="/" />} />
          <Route path="/expenses/:id/edit" element={isAuthenticated ? <EditExpensePage /> : <Navigate to="/" />} />
          <Route path="/expenses" element={isAuthenticated ? <ExpensesPage /> : <Navigate to="/" />} />
          <Route path="/expenses-by-month" element={isAuthenticated ? <ExpensesByMonthPage /> : <Navigate to="/" />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/" element={<HomePage isAuthenticated={isAuthenticated} mode={mode} setMode={setMode} />} />

          {/* 其他路由 */}
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
