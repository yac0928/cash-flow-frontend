import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useNavigate } from 'react-router-dom'
import { getCalendar } from '../../apis/expenses'
import { getMovies } from '../../apis/movies'
import { ButtonGroup, Button } from 'react-bootstrap'
import './Calendar.css'

const MyCalendar = ({ isAuthenticated }) => {
  const [date, setDate] = useState(new Date())
  const [calendarData, setCalendarData] = useState([])
  const [mode, setMode] = useState('cash-flow')
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
        { state: { params } }
      )
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
      return matchingData.length > 0 ? <p>{'x'.repeat(matchingData.length)}</p> : null
    }
    return null
  }
  return (
    <div className="container">
      <ButtonGroup className="mb-3">
        <Button variant={mode === 'cash-flow' ? 'primary' : 'secondary'} onClick={() => setMode('cash-flow')}>Cash Flow Mode</Button>
        <Button variant={mode === 'movies' ? 'primary' : 'secondary'} onClick={() => setMode('movies')}>Miramar Movie Theater Mode</Button>
      </ButtonGroup>
      <Calendar onChange={onChange} value={date} tileContent={tileContent} />
    </div>
  )
}

export default MyCalendar
