import { useState, useEffect } from 'react'
import { getExpenses } from '../../apis/expenses.js'
import noty from '../../utils/Noty.js'

const ExpensesList = ({ selectedCategoryId, year, month, day }) => {
  const [expensesData, setExpensesData] = useState(null)
  const [totalAmountData, setTotalAmountData] = useState(0)
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
        {expensesData.length
          ? expensesData.map((expense) => (
          <li key={expense.id}>
            <p>{expense.name}</p>
            <p>Amount: {expense.amount}</p>
          </li>
          ))
          : <p>No data found</p>}
      </ul>
      <p>Total Amount: {totalAmountData}</p>
    </div>
  )
}

export default ExpensesList
