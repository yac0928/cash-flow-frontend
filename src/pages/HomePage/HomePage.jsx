import Calendar from '../../components/Calendar/Calendar'
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import noty from '../../utils/Noty'

const HomePage = ({ isAuthenticated, mode, setMode, setIsAuthenticated }) => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/' && location.search) {
      const handleGoogleAuth = async () => {
        const urlParams = new URLSearchParams(location.search)
        const token = urlParams.get('token')
        const currentUser = JSON.parse(urlParams.get('user'))

        if (token && currentUser && !isAuthenticated) {
          localStorage.setItem('Token', token)
          localStorage.setItem('User', JSON.stringify(currentUser))
          setIsAuthenticated(true)
          navigate('/')
        }
      }

      handleGoogleAuth()
    }
  }, [location, navigate, setIsAuthenticated, isAuthenticated])
  return (
    <div>
      <Calendar isAuthenticated={isAuthenticated} mode={mode} setMode={setMode} />
    </div>
  )
}

export default HomePage
