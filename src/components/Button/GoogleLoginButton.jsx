import { useNavigate } from 'react-router-dom'
import { googleLogin } from '../../apis/auth'
import noty from '../../utils/Noty'
import './GoogleLoginButton.css'

const CustomGoogleLoginButton = ({ setIsAuthenticated, setShowLoginModal, mode }) => {
  const navigate = useNavigate()
  const handleGoogleLogin = async () => {
    try {
      const { success, token, currentUser } = await googleLogin()
      if (success) {
        localStorage.setItem('Token', token)
        localStorage.setItem('User', JSON.stringify(currentUser))
        noty('Successfully logged in!', 'success')
        setIsAuthenticated(true)
        setShowLoginModal(false)
        if (mode === 'cash-flow') {
          navigate('/')
        }
      } else {
        noty('Google login failed', 'error')
      }
    } catch (error) {
      console.error('An error occurred during Google login:', error)
      noty('Google login failed', 'error')
    }
  }

  return (
    <button className="custom-google-login-button" onClick={handleGoogleLogin}>
      Sign in with Google
    </button>
  )
}

export default CustomGoogleLoginButton
