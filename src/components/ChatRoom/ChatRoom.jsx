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
    } catch (error) {
      console.error('Error submitting user input:', error)
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
                    {
                      (JSON.parse(messages.content).expenses && JSON.parse(messages.content).expenses.length > 0) || Object.keys(JSON.parse(messages.content).newExpenses).length > 0
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
                        : <p>No expenses to display.</p>
                    }

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
