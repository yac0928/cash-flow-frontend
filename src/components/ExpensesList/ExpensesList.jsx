import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getExpenses } from '../../apis/expenses.js'
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
  const handleDeleteExpense = (expenseId) => {
    // 處理刪除操作，例如發送 DELETE 請求
  }
  useEffect(() => {
    console.log('ExpensesList')
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
      <h2 className="mt-4">Expenses List:</h2>
      <ListGroup className="mb-4">
        {expensesData && expensesData.length
          ? (
              expensesData.map((expense) => (
            <ListGroup.Item key={expense.id}>
              <p>
                <strong>Name:</strong> {expense.name}, <strong>Amount:</strong> {expense.amount}
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
      <p>
        <strong>Total Amount:</strong> {totalAmountData}
      </p>
    </Container>
  )
}

export default ExpensesList
