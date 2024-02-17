import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useNavigate } from 'react-router-dom'
import { getCalendar } from '../../apis/expenses'
import { getMovies, postMovies } from '../../apis/movies'
import { Button, Container, Row, Col } from 'react-bootstrap'
import noty from '../../utils/Noty'

import './Calendar.css'

const MyCalendar = ({ isAuthenticated, mode, setMode }) => {
  const [date, setDate] = useState(new Date())
  const [calendarData, setCalendarData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const onChange = (newDate) => {
    setDate(newDate)
    const year = newDate.getFullYear()
    const month = newDate.getMonth() + 1
    const day = newDate.getDate()
    if (mode === 'cash-flow') {
      const params = { year, month, day, categoryId: null }
      navigate(
        `/expenses?year=${params.year}&month=${params.month}&day=${params.day}&categoryId=`,
        { state: { params } }
      )
    } else if (mode === 'movies') {
      const params = { year, month, day }
      navigate(
        `/movies?year=${params.year}&month=${params.month}&day=${params.day}`,
        { state: { params, moviesData: calendarData } }
      )
    }
  }
  const handleUpdateMovies = async () => {
    setIsLoading(true)
    try {
      await postMovies()
      noty('Movies updated successfully!', 'success')
    } catch (error) {
      console.error('Error updating movies:', error)
      noty('Failed to update movies. Please try again later.', 'error')
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (mode === 'cash-flow') {
          const token = localStorage.getItem('Token')
          if (token) {
            const data = await getCalendar()
            setCalendarData(data.expenses)
          } else {
            setCalendarData([])
          }
        } else if (mode === 'movies') {
          const data = await getMovies()
          setCalendarData(data.movies)
        }
      } catch (error) {
        console.error('Failed to fetch calendar data:', error)
      }
    }
    fetchData()
  }, [isAuthenticated, mode])
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const matchingData = calendarData && calendarData.length && calendarData.filter(item => {
        if (item.date && mode === 'cash-flow') {
          const itemDate = item.date.split('T')[0]
          const formattedDateString = new Date(Date.UTC(year, month - 1, day)).toISOString().split('T')[0]
          return itemDate === formattedDateString
        } else if (item.Screenings && mode === 'movies') {
          return item.Screenings.some(screening => {
            const screeningDate = screening.date.split('T')[0]
            const formattedDateString = new Date(Date.UTC(year, month - 1, day)).toISOString().split('T')[0]
            return screeningDate === formattedDateString
          })
        }
        return false
      })
      return matchingData && matchingData.length > 0
        ? <div style={{ height: '20px' }}>
          ({matchingData.length})
        </div>
        : null
    }
    return null
  }
  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col md={6} className="text-center">
          <Button variant={mode === 'cash-flow' ? 'primary' : 'secondary'} onClick={() => setMode('cash-flow')} block="true">
            Cash Flow Mode
          </Button>
        </Col>
        <Col md={6} className="text-center">
          <Button variant={mode === 'movies' ? 'primary' : 'secondary'} onClick={() => setMode('movies')} block="true">
            Miramar Movie Theater Mode
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        {mode === 'movies' && (
          <Col md={12} className="text-center">
            <Button variant="primary" onClick={handleUpdateMovies} disabled={isLoading}>
              {isLoading ? 'Updating Movies...' : 'Update Movies'}
            </Button>
          </Col>
        )}
      </Row>
      <Row className="justify-content-center mt-3">
        <Col md={12} className="text-center">
          <Calendar onChange={onChange} value={date} tileContent={tileContent} />
        </Col>
      </Row>
    </Container>
  )
}

export default MyCalendar
