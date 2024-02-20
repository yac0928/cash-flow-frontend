import { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import LoginInputBox from '../Input/LoginInputBox.jsx'
import { signUp } from '../../apis/auth.js'
import noty from '../../utils/Noty.js'

export default function SignUpModal({ showSignUpModal, setShowSignUpModal, setShowLoginModal }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [isError, setIsError] = useState('')

  const handleSignUp = async () => {
    if (name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 || passwordConfirm.trim().length === 0 || isError) {
      noty('Please fill in all fields with valid information!', 'error')
      return
    }
    if (password !== passwordConfirm) {
      noty('Passwords must match!', 'error')
      return
    }
    const { success } = await signUp({
      name,
      email,
      password,
      passwordConfirm
    })
    if (success) {
      noty('Successfully signup!', 'success')
      setShowSignUpModal(false)
      setShowLoginModal(true)
    } else {
      noty('Signup failed somehow :(', 'error')
    }
  }

  return (
    <>
      <Button variant="primary" onClick={() => setShowSignUpModal(true)}>
        註冊
      </Button>

      <Modal show={showSignUpModal} onHide={() => setShowSignUpModal(false)}>
        <Modal.Header>
          <Modal.Title>註冊</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <LoginInputBox
                label='Name'
                type='text'
                value={name}
                onChange={(inputValue) => setName(inputValue)}
                maxLength='30'
                setIsError={setIsError}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <LoginInputBox
                label='Email'
                type='text' // 可以設為email type，text方便測試
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

            <Form.Group controlId="formPasswordConfirm">
              <LoginInputBox
                label='Confirm Password'
                type='password'
                value={passwordConfirm}
                onChange={(inputValue) => setPasswordConfirm(inputValue)}
                maxLength='20'
                setIsError={setIsError}
              />
            </Form.Group>

            {isError && <div style={{ color: 'red' }}>{isError}</div>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSignUpModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSignUp}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
