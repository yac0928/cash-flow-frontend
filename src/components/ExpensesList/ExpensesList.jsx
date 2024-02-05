import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getExpenses, getExpense } from '../../apis/expenses.js'
import noty from '../../utils/Noty.js'

const ExpensesList = ({ selectedCategoryId, year, month, day }) => {
  const [expensesData, setExpensesData] = useState(null)
  const [totalAmountData, setTotalAmountData] = useState(0)
  const navigate = useNavigate()
  const handleEditExpense = async (expenseId) => {
    try {
      const { success, expense } = await getExpense(expenseId)
      if (success) {
        navigate(`/expenses/${expenseId}/edit`, { state: { expense } })
      } else {
        console.error('Failed to get expense details for editing.')
      }
    } catch (error) {
      console.error('An error occurred while getting expense details for editing:', error)
    }
  }

  const handleDeleteExpense = (expenseId) => {
    // 處理刪除操作，例如發送 DELETE 請求
  }
  useEffect(() => {
    console.log('ExpensesList')
    const getData = async () => {
      const queryParams = {
        year,
        month,
        day,
        categoryId: selectedCategoryId === 'null' ? undefined : selectedCategoryId
      }
      const { success, expenses, totalAmount } = await getExpenses(queryParams)
      if (success) {
        console.log('expenses:', expenses)
        setExpensesData(expenses)
        setTotalAmountData(totalAmount)
      } else {
        noty('Failed to get expenses!', 'error')
      }
    }
    getData()
  }, [selectedCategoryId, year, month, day])

  return (
    <div>
      <h2>Expenses List:</h2>
      <ul>
        {expensesData && expensesData.length
          ? expensesData.map((expense) => (
            <li key={expense.id}>
              <p>Name:{expense.name}, Amount: {expense.amount}
                <button onClick={() => handleEditExpense(expense.id)}>Edit</button>
                <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
              </p>
            </li>
          ))
          : <p>No data found</p>}
      </ul>
      <p>Total Amount: {totalAmountData}</p>
    </div>
  )
}

export default ExpensesList
