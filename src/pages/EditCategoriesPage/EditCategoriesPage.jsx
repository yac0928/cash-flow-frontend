import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCategories } from '../../apis/categories.js'
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap'
import noty from '../../utils/Noty.js'

const ChooseCategoriesPage = () => {
  const [categoriesData, setCategoriesData] = useState(null)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [unselectedCategories, setUnselectedCategories] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { success, categories } = await getCategories()
        if (success) {
          setCategoriesData(categories)
          const user = JSON.parse(localStorage.getItem('User'))
          if (user && user.Categories) {
            const userCategoryIds = user.Categories.map(category => category.id)
            const selected = categories.filter(category => userCategoryIds.includes(category.id))
            const unselected = categories.filter(category => !userCategoryIds.includes(category.id))
            setSelectedCategories(selected)
            setUnselectedCategories(unselected)
          }
        } else {
          noty('Failed to get data!', 'error')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        noty('Failed to get data!', 'error')
      }
    }

    fetchData()
  }, [])

  const handleSelectCategory = (categoryId) => {
    const category = categoriesData.find(category => category.id === categoryId)
    setSelectedCategories(prevState => [...prevState, category])
    setUnselectedCategories(prevState => prevState.filter(category => category.id !== categoryId))
  }

  const handleUnselectCategory = (categoryId) => {
    const category = selectedCategories.find(category => category.id === categoryId)
    setSelectedCategories(prevState => prevState.filter(category => category.id !== categoryId))
    setUnselectedCategories(prevState => [...prevState, category])
  }

  const handleConfirmSelection = () => {
    const user = JSON.parse(localStorage.getItem('User'))
    user.Categories = selectedCategories
    localStorage.setItem('User', JSON.stringify(user))
    noty('Categories updated successfully!', 'success')
    navigate('/')
  }

  return (
    <Container fluid="lg">
      <Row className="mt-4">
        <Col md={6}>
          <Card className="shadow-sm mb-4 bg-light">
            <Card.Body>
              <Card.Title>Selected Categories</Card.Title>
              <ListGroup variant="flush">
                {selectedCategories.map(category => (
                  <ListGroup.Item key={category.id} className="d-flex justify-content-between align-items-center">
                    {category.name}
                    <Button variant="outline-danger" size="sm" onClick={() => handleUnselectCategory(category.id)}>Remove</Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm mb-4 bg-light">
            <Card.Body>
              <Card.Title>Unselected Categories</Card.Title>
              <ListGroup variant="flush">
                {unselectedCategories.map(category => (
                  <ListGroup.Item key={category.id} className="d-flex justify-content-between align-items-center">
                    {category.name}
                    <Button variant="outline-success" size="sm" onClick={() => handleSelectCategory(category.id)}>Select</Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={4} className="text-center">
          <Button variant="primary" size="lg" onClick={handleConfirmSelection}>Confirm Selection</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default ChooseCategoriesPage
