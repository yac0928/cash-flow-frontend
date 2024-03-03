import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userAiInput } from '../../apis/userAi'
import { BsChatDots } from 'react-icons/bs'
import { Form, Button } from 'react-bootstrap'
import './ChatRoom.css'

function ChatRoom (isAuthenticated) {
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (event) => {
    setUserInput(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { success, outputMessages } = await userAiInput({ userInput })
      if (success) {
        setMessages(outputMessages)
      }
      setUserInput('')
      console.log(messages)
    } catch (error) {
      console.error('Error submitting user input:', error)
    }
  }

  useEffect(() => {
    if (typeof messages === 'object' && messages.name === 'getExpenses' && messages.content) {
      const args = JSON.parse(messages.arguments)
      const { year, month, day } = args
      const params = { year, month, day, categoryId: null }
      navigate(
          `/expenses?year=${params.year}&month=${params.month}&day=${params.day}&categoryId=`,
          { state: { params } }
      )
    }
  }
  , [messages])

  const toggleChatRoom = () => {
    setIsExpanded((prevExpanded) => !prevExpanded)
  }

  return (
    <>
      <div className={`chat-room ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <div className="messages">
          {Array.isArray(messages)
            ? (
                messages.map((message, index) => (
              <div key={index} className={`message ${message.role}`}>
                {message.content}
              </div>
                ))
              )
            : (
            <div className="message">
              {messages.role === 'function' && (
                <div className={`message ${messages.role}`}>
                  {messages.content}
                </div>
              )}
            </div>
              )}
        </div>
        <Form onSubmit={handleSubmit} className={'input-form'}>
          <Form.Group className="mb-0">
            <div className="d-flex">
              <Form.Control
                type="text"
                value={userInput}
                onChange={handleInputChange}
                placeholder="Type your message"
                className="input-field"
              />
              <Button type="submit" className="send-button">
                Send
              </Button>
            </div>
          </Form.Group>
        </Form>
      </div>
      {
        isAuthenticated && (
          <div className="toggle-button" onClick={toggleChatRoom}>
            <BsChatDots size={50} className="toggle-icon" />
          </div>
        )
      }
    </>
  )
}

export default ChatRoom
