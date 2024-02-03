import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getExpenses } from '../../apis/expenses.js'
import noty from '../../utils/Noty.js'

const CategoryFilter = ({ onSelectCategory, year, month, day }) => {
  const [categoriesData, setCategoriesData] = useState(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const navigate = useNavigate()

  const handleCategoryIdChange = (categoryId) => {
    setSelectedCategoryId(categoryId)
    onSelectCategory(categoryId) // 將選擇的 categoryId 通知到父組件
    navigate(`/expenses?year=${year}&month=${month}&day=${day}&categoryId=${categoryId}`)
  }

  useEffect(() => {
    console.log('CategoryFilter')
    const getData = async () => {
      try {
        const { success, categories } = await getExpenses()
        if (success) {
          setCategoriesData(categories)
        } else {
          noty('Failed to get categories!', 'error')
        }
      } catch (error) {
        console.error('Error fetching categories from getExpenses:', error)
        noty('An error occurred while fetching categories from getExpenses.', 'error')
      }
    }
    getData()
  }, [])

  return (
    <div>
      <h3>Categories:</h3>
      <ul>
        <li
          key="all"
          onClick={() => handleCategoryIdChange(null)}
          style={{
            cursor: 'pointer',
            fontWeight: selectedCategoryId === null ? 'bold' : 'normal'
          }}
        >
          All
        </li>
        {categoriesData &&
          categoriesData.map((category) => (
            <li
              key={category.id}
              onClick={() => handleCategoryIdChange(category.id)}
              style={{
                cursor: 'pointer',
                fontWeight: selectedCategoryId === category.id ? 'bold' : 'normal'
              }}
            >
              {category.name}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default CategoryFilter
