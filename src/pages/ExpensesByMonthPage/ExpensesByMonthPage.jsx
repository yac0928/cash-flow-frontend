import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import CategoryFilterForMonth from '../../components/Filter/CategoryFilterForMonth'
import ExpensesByMonthList from '../../components/ExpensesByMonthList/ExpensesByMonthList'
import { Container, Row, Col } from 'react-bootstrap'

const ExpensesByMonthPage = () => {
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
          <h1>{params.year}-{params.month}</h1>
        </Row>
        <Row>
          <CategoryFilterForMonth
            onSelectCategory={handleCategoryIdChange}
            params={params}
          />
        </Row>
        <Row>
          <ExpensesByMonthList
            selectedCategoryId={selectedCategoryId}
            params={params}
          />
        </Row>
      </Col>
    </Container>
  )
}

export default ExpensesByMonthPage
