import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CategoryFilter from '../../components/Filter/CategoryFilter'
import ExpensesList from '../../components/ExpensesList/ExpensesList'

const ExpensesPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const year = Number(searchParams.get('year'))
  const month = Number(searchParams.get('month'))
  const day = Number(searchParams.get('day'))
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)

  const handleCategoryIdChange = (categoryId) => {
    setSelectedCategoryId(categoryId)
  }
  useEffect(() => {
    // 在這裡檢查是否有有效的 token
    console.log(localStorage.getItem('userToken'))
    if (!localStorage.getItem('userToken')) {
      navigate('/')
    }
  })

  return (
    <div>
      <CategoryFilter
        onSelectCategory={handleCategoryIdChange}
        year={year}
        month={month}
        day={day}
      />
      <ExpensesList
        selectedCategoryId={selectedCategoryId}
        year={year}
        month={month}
        day={day}
      />
    </div>
  )
}

export default ExpensesPage
