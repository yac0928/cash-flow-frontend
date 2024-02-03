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

    // 導航到指定路由
    navigate(`/expenses?year=${year}&month=${month}&day=${day}&categoryId=`)
  }

  return (
    <div>
      <h1>My Calendar App</h1>
      <Calendar onChange={onChange} value={date} />
    </div>
  )
}

export default MyCalendar
