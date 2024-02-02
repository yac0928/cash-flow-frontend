import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './Calendar.css'

const MyCalendar = () => {
  const [date, setDate] = useState(new Date())

  const onChange = (newDate) => {
    setDate(newDate)
    // 可以在這裡處理日期變更後的邏輯
  }

  return (
    <div>
      <h1>My Calendar App</h1>
      <Calendar onChange={onChange} value={date} />
    </div>
  )
}

export default MyCalendar
