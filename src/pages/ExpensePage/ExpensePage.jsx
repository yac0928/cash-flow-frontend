import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { getExpense, deleteExpense } from '../../apis/expenses'
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
  const handleDeleteExpense = async (expenseId) => {
    const confirmMessage = expense.group
      ? 'Are you sure you want to delete this expense? (including the same group expenses after this)'
      : 'Are you sure you want to delete this expense?'

    const confirmDelete = window.confirm(confirmMessage)
    if (confirmDelete) {
      const { success, deletedExpenses } = await deleteExpense(expenseId)
      if (success) {
        noty('Delete Expense Successfully!', 'success')
        if (Array.isArray(deletedExpenses)) {
          deletedExpenses.forEach((expense, i) => {
            noty(`Deleted expense ${i + 1}: Date - ${expense.date.split('T')[0]}, Name - ${expense.name}`, 'information')
          })
        } else if (typeof deletedExpenses === 'object' && deletedExpenses !== null) {
          noty(`Deleted expense: Date - ${deletedExpenses.date.split('T')[0]}, Name - ${deletedExpenses.name}`, 'information')
        }
        console.log('deletedExpenses: ', deletedExpenses)
        navigate(`/expenses?year=${params.year}&month=${params.month}&day=${params.day}&categoryId=`, { state: { params } })
      } else {
        noty('Delete Expense Failed!', 'error')
      }
    }
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
          <Button className="ml-2" variant="secondary" onClick={() => backToExpensesPage()}>
            Back
          </Button>
          <Button className="ml-2" variant="info" onClick={() => toEditExpensePage(expenseId)}>
            Edit
          </Button>
          <Button className="ml-2" variant="danger" onClick={() => handleDeleteExpense(expenseId)}>
            Delete
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default ExpensePage
