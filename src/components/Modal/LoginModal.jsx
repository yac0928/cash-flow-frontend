import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, Button, Form } from 'react-bootstrap'
// components
import LoginInputBox from '../Input/LoginInputBox.jsx'
// api
import { login } from '../../apis/auth.js'
// utils
import noty from '../../utils/Noty.js'

export default function LoginModal({ setIsAuthenticated }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState('')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const navigate = useNavigate()
  // 登入功能
  const handleLogin = async () => {
    console.log('handleLogin')
    if (email.trim().length === 0 || password.trim().length === 0 || isError) {
      noty('Please use valid email or password!', 'error')
      return
    }

    const { token, currentUser, message } = await login({
      email,
      password
    })
    console.log('login api successfully!')
    if (token) {
      localStorage.setItem('Token', token)
      const user = JSON.stringify(currentUser)
      localStorage.setItem('User', user)
      noty('Successfully login!', 'success')
      setIsAuthenticated(true)
      navigate('/')
    } else {
      noty(message, 'error')
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
                type="text"
                value={email}
                onChange={(inputValue) => setEmail(inputValue)}
                maxLength='30'
                setIsError={setIsError}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <LoginInputBox
                label='Password'
                type="password"
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
      </Modal>
    </>
  )
}
