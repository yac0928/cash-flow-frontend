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
      <Container>
        <h1 className="text-center">{params.year}-{params.month}-{params.day}</h1>
        {filteredMovies.length > 0
          ? (
          <MoviesList movies={filteredMovies} targetDate={params} />
            )
          : (
          <h3 className="text-center">--No Movies--</h3>
            )}
      </Container>
    </div>
  )
}

export default MoviesPage
