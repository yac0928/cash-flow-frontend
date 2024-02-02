import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <div>
      <BrowserRouter>
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
