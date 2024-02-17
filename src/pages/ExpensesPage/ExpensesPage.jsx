import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import CategoryFilter from '../../components/Filter/CategoryFilter'
import ExpensesList from '../../components/ExpensesList/ExpensesList'
import { Container, Row, Col } from 'react-bootstrap'

const ExpensesPage = () => {
  const location = useLocation()
  const { params } = location.state
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)

  const handleCategoryIdChange = (categoryId) => {
    setSelectedCategoryId(categoryId)
  }

  return (
    <Container>
      <Col>
        <Row className="justify-content-center">
          <h1>{params.year}-{params.month}-{params.day}</h1>
        </Row>
        <Row>
          <CategoryFilter
            onSelectCategory={handleCategoryIdChange}
            params={params}
          />
        </Row>
        <Row>
          <ExpensesList
            selectedCategoryId={selectedCategoryId}
            params={params}
          />
        </Row>
      </Col>
    </Container>
  )
}

export default ExpensesPage
