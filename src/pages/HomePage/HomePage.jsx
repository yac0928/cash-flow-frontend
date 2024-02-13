import Calendar from '../../components/Calendar/Calendar'

const HomePage = ({ isAuthenticated }) => {
  return (
    <div>
      <Calendar isAuthenticated={isAuthenticated}/>
    </div>
  )
}

export default HomePage
