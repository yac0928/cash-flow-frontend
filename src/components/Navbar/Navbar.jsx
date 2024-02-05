import { Link, useNavigate } from 'react-router-dom'

import LoginModal from '../Modal/LoginModal'

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('Token')
    localStorage.removeItem('User')
    setIsAuthenticated(false)
    navigate('/')
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
