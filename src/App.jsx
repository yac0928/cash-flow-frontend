import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/HomePage'
import './App.css'

const App = () => {
  return (
    <div>
      <BrowserRouter basename='calendar'>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* 其他路由 */}
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
