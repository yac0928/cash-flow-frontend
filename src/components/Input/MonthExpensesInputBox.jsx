import { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const MonthExpensesInputBox = () => {
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (year.trim() && month.trim()) {
      const params = { year, month, categoryId: null }
      navigate(`/expenses-by-month?year=${params.year}&month=${params.month}&categoryId=`, { state: { params } })
    } else {
      alert('Please fill in both year and month')
    }
  }

  return (
    <Container>
      <Row className="justify-content-md-center mt-3">
        <Col md={9}>
          <h3>Select expenses by month：</h3>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={3}>
                <Form.Group controlId="year">
                  <Form.Label>Year</Form.Label>
                  <small>   (2001-2050)</small>
                  <Form.Control
                    type="number"
                    placeholder="Enter year"
                    min={2001}
                    max={2050}
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="month">
                  <Form.Label>Month</Form.Label>
                  <small>   (1-12)</small>
                  <Form.Control
                    type="number"
                    placeholder="Enter month"
                    min={1}
                    max={12}
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={2} className="d-flex align-items-end">
                <Button variant="primary" type="submit" className="w-100">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default MonthExpensesInputBox
