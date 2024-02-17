import { useLocation } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import MoviesList from '../../components/MoviesList/MoviesList'

const MoviesPage = () => {
  const location = useLocation()
  const { params, moviesData } = location.state

  const filteredMovies = moviesData.filter(movie => {
    const filteredScreenings = movie.Screenings.filter(screening => {
      const screeningDate = new Date(screening.date)
      const targetDate = new Date(Date.UTC(params.year, params.month - 1, params.day))
      return screeningDate.toDateString() === targetDate.toDateString()
    })
    return filteredScreenings.length > 0
  })

  return (
    <div>
      <h1>Movies on {params.year}-{params.month}-{params.day}</h1>
      <Container>
        <MoviesList movies={filteredMovies} targetDate={params} />
      </Container>
    </div>
  )
}

export default MoviesPage
