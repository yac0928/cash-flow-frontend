import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { userAiInput } from '../../apis/userAi'
import { Form, Button } from 'react-bootstrap'
import './ChatRoom.css'

function ChatRoom () {
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const navigate = useNavigate()
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(scrollToBottom, [messages])

  const handleInputChange = (event) => {
    setUserInput(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSending(true) // 將 isSending 設置為 true，表示正在發送消息
    try {
      const { success, outputMessages } = await userAiInput({ userInput })
      if (success) {
        setMessages(outputMessages)
      }
      setUserInput('')
    } catch (error) {
      console.error('Error submitting user input:', error)
    } finally {
      setIsSending(false) // 無論發送成功或失敗，都將 isSending 設置為 false
    }
  }

  useEffect(() => {
    if (typeof messages === 'object' && messages.name === 'getExpenses') {
      const args = JSON.parse(messages.arguments)
      const { year, month, day } = args
      const params = { year, month, day, categoryId: null }
      navigate(
        `/expenses?year=${params.year}&month=${params.month}&day=${params.day}&categoryId=`,
        { state: { params } }
      )
    } else if (typeof messages === 'object' && messages.name === 'getExpensesByMonth') {
      const args = JSON.parse(messages.arguments)
      const { year, month } = args
      const params = { year, month, categoryId: null }
      navigate(
        `/expenses-by-month?year=${params.year}&month=${params.month}&categoryId=`,
        { state: { params } }
      )
    } else if (typeof messages === 'object' && messages.name === 'postExpense') {
      const argsDate = JSON.parse(messages.arguments).date
      console.log(argsDate)
      const year = argsDate.substring(0, 4)
      const month = argsDate.substring(5, 7)
      const day = argsDate.substring(8, 10)
      const params = { year, month, day, categoryId: null }
      navigate(
        `/expenses?year=${params.year}&month=${params.month}&day=${params.day}&categoryId=`,
        { state: { params } }
      )
    }
  }, [messages])

  const toggleChatRoom = () => {
    setIsExpanded((prevExpanded) => !prevExpanded)
  }

  return (
    <>
      <div className="toggle-button" onClick={toggleChatRoom}>
        <div className="toggle-icon" style={{ width: 60, height: 60, borderRadius: '50%', overflow: 'hidden' }}>
          <img src="/robot6.webp" alt="Chat Icon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
      <div className={`chat-room ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <div className="messages">
          <div className="chatroom-bar" onClick={toggleChatRoom}>
            <div className="message">
              Ai Chatroom
            </div>
          </div>
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
                  <>
                    <div className={`message ${messages.role}`}>
                      {
                        (JSON.parse(messages.content).expenses && JSON.parse(messages.content).expenses.length > 0) || (JSON.parse(messages.content).newExpenses && Object.keys(JSON.parse(messages.content).newExpenses).length > 0)
                          ? (
                              JSON.parse(messages.content).expenses && JSON.parse(messages.content).expenses.length > 0
                                ? (
                                    JSON.parse(messages.content).expenses.map((expense, index) => (
                                  <div key={expense.id}>
                                    <p>{index + 1}. Name: {expense.name}</p>
                                    <p>Amount: {expense.amount}</p>
                                  </div>
                                    ))
                                  )
                                : (
                                <div>
                                  {
                                    <div>
                                      <p>Date: {JSON.parse(messages.content).newExpenses.date.split('T')[0]}</p>
                                      <p>Name: {JSON.parse(messages.content).newExpenses.name}</p>
                                      <p>Amount: {JSON.parse(messages.content).newExpenses.amount}</p>
                                    </div>
                                  }
                                </div>
                                  )
                            )
                          : <p>No expenses found.</p>
                      }
                    </div>
                    <div className='message function'>
                      還需要什麼服務嗎?
                    </div>
                  </>
                )}
              </div>
              )}
          <div ref={messagesEndRef} />
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
              <Button type="submit" className="send-button" disabled={isSending}>
                Send
              </Button>
            </div>
          </Form.Group>
        </Form>
      </div>
    </>
  )
}

export default ChatRoom
