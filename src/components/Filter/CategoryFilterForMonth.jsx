import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, ListGroup, Button } from 'react-bootstrap'

const CategoryFilterForMonth = ({ onSelectCategory, params }) => {
  const [categoriesData, setCategoriesData] = useState(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const navigate = useNavigate()

  const handleCategoryIdChange = (categoryId) => {
    setSelectedCategoryId(categoryId)
    onSelectCategory(categoryId) // 將選擇的 categoryId 通知到父組件
    navigate(`/expenses-by-month?year=${params.year}&month=${params.month}&categoryId=${categoryId}`, { state: { params } })
  }

  const toEditCategoriesPage = () => {
    navigate('/categories')
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('User'))
    setCategoriesData(user.Categories)
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
        <Button variant="info" onClick={() => toEditCategoriesPage()}>
          Edit
        </Button>
      </ListGroup>
    </Container>
  )
}

export default CategoryFilterForMonth
