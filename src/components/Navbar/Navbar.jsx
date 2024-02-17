import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'
import LoginModal from '../Modal/LoginModal'

const CustomNavbar = ({ isAuthenticated, setIsAuthenticated, mode }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('Token')
    localStorage.removeItem('User')
    setIsAuthenticated(false)
    navigate('/')
  }

  const user = JSON.parse(localStorage.getItem('User'))

  return (
    <Navbar className={mode === 'cash-flow' ? 'navbar-light bg-light' : 'navbar-dark bg-dark'} expand="lg">
      <Navbar.Brand as={Link} to="/">
        Home
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {isAuthenticated
            ? (
              <>
                <Nav.Item>
                  <Nav.Link disabled>Hi, {user.name} ({user.Subscription.level} level)</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Button variant="link" onClick={handleLogout}>
                    Logout
                  </Button>
                </Nav.Item>
              </>
              )
            : (
              <Nav.Item>
                <LoginModal setIsAuthenticated={setIsAuthenticated} />
              </Nav.Item>
              )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default CustomNavbar
