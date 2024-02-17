import Calendar from '../../components/Calendar/Calendar'

const HomePage = ({ isAuthenticated, mode, setMode }) => {
  return (
    <div>
      <Calendar isAuthenticated={isAuthenticated} mode={mode} setMode={setMode} />
    </div>
  )
}

export default HomePage
