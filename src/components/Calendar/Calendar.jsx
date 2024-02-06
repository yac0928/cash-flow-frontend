import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useNavigate } from 'react-router-dom'
import './Calendar.css'

const MyCalendar = () => {
  const [date, setDate] = useState(new Date())
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

  return (
    <div>
      <h1>My Calendar App</h1>
      <h2>Login for additional features</h2>
      <Calendar onChange={onChange} value={date} />
    </div>
  )
}

export default MyCalendar
