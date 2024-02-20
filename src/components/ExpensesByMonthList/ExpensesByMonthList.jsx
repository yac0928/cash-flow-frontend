import { useState, useEffect } from 'react'
import { getExpensesByMonth } from '../../apis/expenses.js'
import noty from '../../utils/Noty.js'
import { Container, ListGroup } from 'react-bootstrap'

const ExpensesByMonthList = ({ selectedCategoryId, params }) => {
  const [expensesByMonthData, setExpensesByMonthData] = useState(null)
  const [totalAmountData, setTotalAmountData] = useState(0)

  useEffect(() => {
    const getData = async () => {
      const queryParams = {
        year: params.year,
        month: params.month,
        categoryId: selectedCategoryId === 'null' ? undefined : selectedCategoryId
      }
      const { success, expenses, totalAmount } = await getExpensesByMonth(queryParams)
      if (success) {
        expenses.sort((a, b) => new Date(a.date) - new Date(b.date))
        setExpensesByMonthData(expenses)
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
        {expensesByMonthData && expensesByMonthData.length
          ? (
              expensesByMonthData.map((expense) => (
              <ListGroup.Item key={expense.id}>
                <span>
                  <i className={`fas ${expense.Category.icon}`} style={{ marginRight: '0.5rem' }}></i>
                </span>
                <p style={{ display: 'inline-block', width: '200px', margin: '0' }}>
                  <strong>Date:</strong> {new Date(expense.date).toISOString().split('T')[0]}
                </p>
                <p style={{ display: 'inline-block', width: '200px', margin: '0' }}>
                  <strong>Name:</strong> {expense.name}
                </p>
                <p style={{ display: 'inline-block', width: '150px', margin: '0' }}>
                  <strong>Amount:</strong> ${expense.amount}
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

export default ExpensesByMonthList
