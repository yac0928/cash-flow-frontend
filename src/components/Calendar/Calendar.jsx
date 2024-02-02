import { Link } from 'react-router-dom'

const Calendar = () => {
  // Your calendar implementation here

  return (
    <div>
      {/* Your calendar buttons */}
      <Link to="/expenses/year=2022;month=1;day=1">Go to expenses</Link>
    </div>
  )
}

export default Calendar
