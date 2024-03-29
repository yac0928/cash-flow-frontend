import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getExpenses, deleteExpense } from '../../apis/expenses.js'
import noty from '../../utils/Noty.js'
import { Container, ListGroup, Button } from 'react-bootstrap'

const ExpensesList = ({ selectedCategoryId, params }) => {
  const [expensesData, setExpensesData] = useState(null)
  const [totalAmountData, setTotalAmountData] = useState(0)
  const navigate = useNavigate()
  const toExpensePage = (expenseId) => {
    navigate(`/expenses/${expenseId}`, { state: { params, expenseId } })
  }
  const toEditExpensePage = (expenseId) => {
    navigate(`/expenses/${expenseId}/edit`, { state: { params, expenseId } })
  }
  const handleDeleteExpense = async (expenseId) => {
    const expenseToDelete = expensesData.find(expense => expense.id === expenseId)
    if (!expenseToDelete) {
      console.error('Expense not found')
      return
    }
    const confirmMessage = 'Are you sure you want to delete this expense? (including the same group expenses after this)'

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
        setExpensesData(prevExpenses => prevExpenses.filter(expense => expense.id !== expenseId))
      } else {
        noty('Delete Expense Failed!', 'error')
      }
    }
  }
  const handleAddNewExpenses = () => {
    navigate('/expenses/new', { state: { params } })
  }
  useEffect(() => {
    const getData = async () => {
      const queryParams = {
        year: params.year,
        month: params.month,
        day: params.day,
        categoryId: selectedCategoryId === 'null' ? undefined : selectedCategoryId
      }
      const { success, expenses, totalAmount } = await getExpenses(queryParams)
      if (success) {
        setExpensesData(expenses)
        setTotalAmountData(totalAmount)
      } else {
        noty('Failed to get expenses!', 'error')
      }
    }
    getData()
  }, [selectedCategoryId, params.year, params.month, params.day])

  return (
    <Container>
      <div className="d-flex justify-content-between">
        <h2 className="mt-4 mb-0 flex-grow-1">Expenses List:</h2>
        <h3 className="mt-4 mb-0">Total Amount: {totalAmountData}</h3>
      </div>
      <ListGroup className="mb-4">
        {expensesData && expensesData.length
          ? (
              expensesData.map((expense) => (
              <ListGroup.Item key={expense.id}>
                <p style={{ display: 'inline-block', width: '30px', margin: '0' }}>
                  <span>
                    <i className={`fas ${expense.Category.icon}`} style={{ marginRight: '0.5rem' }}></i>
                  </span>
                </p>
                <p style={{ display: 'inline-block', width: '200px', margin: '0' }}>
                  <strong>Name:</strong> {expense.name}
                </p>
                <p style={{ display: 'inline-block', width: '200px', margin: '0' }}>
                  <strong>Amount:</strong> ${expense.amount}
                </p>
                <p style={{ display: 'inline-block', margin: '0' }}>
                  <Button className="ml-2" variant="primary" onClick={() => toExpensePage(expense.id)}>
                    Details
                  </Button>
                  <Button className="ml-2" variant="info" onClick={() => toEditExpensePage(expense.id)}>
                    Edit
                  </Button>
                  <Button className="ml-2" variant="danger" onClick={() => handleDeleteExpense(expense.id)}>
                    Delete
                  </Button>
                </p>
              </ListGroup.Item>
              ))
            )
          : (
            <ListGroup.Item>No data found</ListGroup.Item>
            )}
      </ListGroup>
      <Button variant="success" onClick={handleAddNewExpenses}>Add new expenses</Button>
    </Container>
  )
}

export default ExpensesList
