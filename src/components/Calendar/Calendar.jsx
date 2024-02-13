import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useNavigate } from 'react-router-dom'
import { getCalendar } from '../../apis/expenses'
import './Calendar.css'

const MyCalendar = ({ isAuthenticated }) => {
  const [date, setDate] = useState(new Date())
  const [calendarData, setCalendarData] = useState([])
  const navigate = useNavigate()
  const onChange = (newDate) => {
    setDate(newDate)

    // 提取年、月、日
    const year = newDate.getFullYear()
    const month = newDate.getMonth() + 1 // 注意月份是從 0 開始的
    const day = newDate.getDate()
    const params = { year, month, day, categoryId: null }
    navigate(
      `/expenses?year=${params.year}&month=${params.month}&day=${params.day}&categoryId=`,
      { state: { params } }
    )
  }
  useEffect(() => {
    const token = localStorage.getItem('Token')
    if (token) {
      const fetchData = async () => {
        try {
          const data = await getCalendar()
          setCalendarData(data.expenses)
        } catch (error) {
          console.error('Failed to fetch calendar data:', error)
        }
      }
      fetchData()
    } else {
      setCalendarData([])
    }
  }, [isAuthenticated])
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const matchingData = calendarData.filter(item => {
        const itemDate = item.date.split('T')[0]
        const formattedDateString = new Date(Date.UTC(year, month - 1, day)).toISOString().split('T')[0]
        return itemDate === formattedDateString
      })
      return matchingData.length > 0 ? <p>{'x'.repeat(matchingData.length)}</p> : null
    }
    return null
  }
  return (
    <div>
      <h1>My Calendar App</h1>
      <h2>Login for additional features</h2>
      <Calendar onChange={onChange} value={date} tileContent={tileContent} />
    </div>
  )
}

export default MyCalendar
