import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, Button, Form } from 'react-bootstrap'
import LoginInputBox from '../Input/LoginInputBox.jsx'
import CustomGoogleLoginButton from '../Button/GoogleLoginButton.jsx'
import { login } from '../../apis/auth.js'
import noty from '../../utils/Noty.js'

export default function LoginModal ({ setIsAuthenticated, mode, showLoginModal, setShowLoginModal }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState('')
  const navigate = useNavigate()
  // 登入功能
  const handleLogin = async () => {
    if (email.trim().length === 0 || password.trim().length === 0 || isError) {
      noty('Please use valid email or password!', 'error')
      return
    }

    const { success, token, currentUser } = await login({
      email,
      password
    })
    if (success) {
      localStorage.setItem('Token', token)
      const user = JSON.stringify(currentUser)
      localStorage.setItem('User', user)
      noty('Successfully login!', 'success')
      setIsAuthenticated(true)
      setShowLoginModal(false)
      if (mode === 'cash-flow') {
        navigate('/')
      }
    } else {
      noty('Wrong email or password', 'error')
    }
  }
  return (
    <>
      <Button variant="primary" onClick={() => setShowLoginModal(true)}>
        登入
      </Button>

      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
        <Modal.Header>
          <Modal.Title>登入</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmail">
              <LoginInputBox
                label='Email'
                type='text'
                value={email}
                onChange={(inputValue) => setEmail(inputValue)}
                maxLength='30'
                setIsError={setIsError}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <LoginInputBox
                label='Password'
                type='password'
                value={password}
                onChange={(inputValue) => setPassword(inputValue)}
                maxLength='20'
                setIsError={setIsError}
              />
            </Form.Group>

            {isError && <div style={{ color: 'red' }}>{isError}</div>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Submit
          </Button>
        </Modal.Footer>
        <CustomGoogleLoginButton setIsAuthenticated={setIsAuthenticated} mode={mode} setShowLoginModal={setShowLoginModal} />
      </Modal>
    </>
  )
}
