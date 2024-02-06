import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { getExpense } from '../../apis/expenses'
import noty from '../../utils/Noty'

const ExpensePage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { params, expenseId } = location.state
  const [expense, setExpense] = useState(null)
  const backToExpensesPage = () => {
    navigate(`/expenses?year=${params.year}&month=${params.month}&day=${params.day}&categoryId=`, { state: { params } })
  }
  const toEditExpensePage = (expenseId) => {
    navigate(`/expenses/${expenseId}/edit`, { state: { params, expenseId } })
  }
  const handleDeleteExpense = (expenseId) => {
    // 處理刪除操作，例如發送 DELETE 請求
  }
  useEffect(() => {
    const getData = async (id) => {
      const { success, expense } = await getExpense(id)
      if (success) {
        setExpense(expense)
        console.log('expense: ', expense)
      } else {
        noty('Failed to get expense', 'error')
        console.error('Failed to get expense details for editing.')
      }
    }
    getData(expenseId)
  }, [expenseId])

  return (
    <Container>
      <Row>
        <Col>
          <h2>Expense Details</h2>
          {expense && (
            <>
              <p><strong>Date:</strong> {expense.date.substring(0, 10)}</p>
              <p><strong>Name:</strong> {expense.name}</p>
              <p><strong>Amount:</strong> {expense.amount}</p>
              <p><strong>Category:</strong> {expense.Category.name}</p>
              <p><strong>Payment:</strong> {expense.Payment.name}</p>
              <p><strong>Comment:</strong> {expense.comment}</p>
            </>
          )}
          <Button onClick={() => backToExpensesPage()} variant="secondary">Back</Button>
          <Button onClick={() => toEditExpensePage(expenseId)} variant="primary">Edit Expense</Button>
          <Button onClick={() => handleDeleteExpense(expenseId)} variant="danger">Delete Expense</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default ExpensePage
