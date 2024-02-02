import { useState } from 'react'
import { Link } from 'react-router-dom'

import LoginModal from '../Modal/LoginModal'

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('currentUserId')
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
