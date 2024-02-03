import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import LoginModal from '../Modal/LoginModal'

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // 在元件初始化時檢查是否存在有效的 token
    const userToken = localStorage.getItem('userToken')
    console.log('userToken', userToken)
    setIsAuthenticated(!!userToken) // 將 userToken 轉換成布林值並設定 isAuthenticated
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('userToken')
    localStorage.removeItem('currentUser')
    setIsAuthenticated(false)
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Home
      </Link>

      <div className="navbar-collapse">
        <ul className="navbar-nav ml-auto">
          {isAuthenticated
            ? (
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
              )
            : (
              <li className="nav-item">
                <LoginModal setIsAuthenticated={setIsAuthenticated} />
              </li>
              )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
