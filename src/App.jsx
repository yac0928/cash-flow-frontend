import { useState} from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/HomePage/HomePage'
import ExpensesPage from './pages/ExpensesPage/ExpensesPage'
import ExpensePage from './pages/ExpensePage/ExpensePage'
import EditExpensePage from './pages/EditExpensePage/EditExpensePage'
import './App.css'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('Token')))
  return (
    <div>
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/expenses" element={isAuthenticated ? <ExpensesPage /> : <Navigate to="/" />} />
          <Route path="/expenses/:id" element={isAuthenticated ? <ExpensePage /> : <Navigate to="/" />} />
          <Route path="/expenses/:id/edit" element={isAuthenticated ? <EditExpensePage /> : <Navigate to="/" />} />

          {/* 其他路由 */}
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
