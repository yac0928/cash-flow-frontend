import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import CategoryFilter from '../../components/Filter/CategoryFilter'
import ExpensesList from '../../components/ExpensesList/ExpensesList'

const ExpensesPage = () => {
  const location = useLocation()
  const { params } = location.state
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)

  const handleCategoryIdChange = (categoryId) => {
    setSelectedCategoryId(categoryId)
  }

  return (
    <div>
      <h3>Date: {params.year}-{params.month}-{params.day}</h3>
      <CategoryFilter
        onSelectCategory={handleCategoryIdChange}
        params = { params }
      />
      <ExpensesList
        selectedCategoryId={selectedCategoryId}
        params= { params }
      />
    </div>
  )
}

export default ExpensesPage
