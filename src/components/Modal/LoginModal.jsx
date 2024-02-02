import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, Button, Form } from 'react-bootstrap'
// components
import InputBox from '../Input/InputBox.jsx'
// api
import { login } from '../../apis/auth.js'
// utils
import noty from '../../utils/Noty.js'

export default function LoginModal ({ setIsAuthenticated }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState('')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const navigate = useNavigate()
  // 登入功能
  const handleLogin = async () => {
    if (email.trim().length === 0 || password.trim().length === 0 || isError) {
      return
    }

    const { token, currentUser, message } = await login({
      email,
      password
    })
    console.log(token)
    if (token) {
      localStorage.setItem('token', token)
      localStorage.setItem('currentUser', currentUser)
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
              <Form.Label>Email</Form.Label>
              <InputBox
                type="text"
                value={email}
                onChange={(inputValue) => setEmail(inputValue)}
                setIsError={setIsError}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>密碼</Form.Label>
              <InputBox
                type="password"
                value={password}
                onChange={(inputValue) => setPassword(inputValue)}
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
