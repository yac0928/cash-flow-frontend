import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCategories } from '../../apis/categories.js'
import noty from '../../utils/Noty.js'
import { Container, ListGroup } from 'react-bootstrap'

const CategoryFilter = ({ onSelectCategory, params }) => {
  const [categoriesData, setCategoriesData] = useState(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const navigate = useNavigate()

  const handleCategoryIdChange = (categoryId) => {
    setSelectedCategoryId(categoryId)
    onSelectCategory(categoryId) // 將選擇的 categoryId 通知到父組件
    navigate(`/expenses?year=${params.year}&month=${params.month}&day=${params.day}&categoryId=${categoryId}`, { state: { params } })
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const { success, categories } = await getCategories()
        if (success) {
          setCategoriesData(categories)
        } else {
          noty('Failed to get categories!', 'error')
        }
      } catch (error) {
        console.error('Error fetching categories from getCategories:', error)
        noty('An error occurred while fetching categories from getCategories.', 'error')
      }
    }
    getData()
  }, [])

  return (
    <Container>
      <h2>Categories:</h2>
      <ListGroup horizontal>
        <ListGroup.Item
          key="all"
          onClick={() => handleCategoryIdChange(null)}
          style={{
            cursor: 'pointer',
            fontWeight: selectedCategoryId === null ? 'bold' : 'normal'
          }}
        >
          All
        </ListGroup.Item>
        {categoriesData &&
          categoriesData.map((category) => (
            <ListGroup.Item
              key={category.id}
              onClick={() => handleCategoryIdChange(category.id)}
              style={{
                cursor: 'pointer',
                fontWeight: selectedCategoryId === category.id ? 'bold' : 'normal'
              }}
            >
              <span>
                <i className={`fas ${category.icon}`} style={{ marginRight: '0.5rem' }}></i>
              </span>
              {category.name}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Container>
  )
}

export default CategoryFilter
