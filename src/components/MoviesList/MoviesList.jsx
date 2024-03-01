import { Card, Button, Col, Row } from 'react-bootstrap'

const MoviesList = ({ movies, targetDate }) => {
  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + '...'
    }
    return description
  }

  return (
    <Row xs={1} md={1} lg={1} className="g-4">
      {movies.map((movie, index) => (
        <Col key={index}>
          <Card className="h-100">
            <Row className="g-0">
              <Col xs={3} md={3} lg={3}>
                <Card.Img variant="top" src={movie.posterUrl} alt={movie.name} className="img-fluid" />
              </Col>
              <Col xs={5} md={4} lg={4}>
                <Card.Body>
                  <Card.Title>{movie.name}</Card.Title>
                  <Card.Title>{movie.nameEn}</Card.Title>
                  <Card.Text>{truncateDescription(movie.description, 100)}</Card.Text>
                  <Card.Text>{movie.duration}</Card.Text>
                  <Button variant="primary" href={`https://www.miramarcinemas.tw${movie.movieDetailUrl}`} target="_blank">查看詳情</Button>
                </Card.Body>
              </Col>
              <Col xs={3} md={3} lg={3}>
                <div className="screenings px-3">
                  <h2>放映資訊</h2>
                  <ul className="list-unstyled">
                    {movie.Screenings.reduce((accumulator, screening) => {
                      const screeningDate = new Date(screening.date)
                      const targetDateUTC = new Date(Date.UTC(targetDate.year, targetDate.month - 1, targetDate.day))
                      if (screeningDate.toDateString() === targetDateUTC.toDateString()) {
                        const existingRoomIndex = accumulator.findIndex(item => item.room === screening.room)
                        if (existingRoomIndex === -1) {
                          accumulator.push({ room: screening.room, times: [screening.time] })
                        } else {
                          accumulator[existingRoomIndex].times.push(screening.time)
                        }
                      }
                      return accumulator
                    }, []).map((item, idx) => {
                      item.times.sort((a, b) => {
                        const timeA = new Date('1970-01-01T' + a)
                        const timeB = new Date('1970-01-01T' + b)
                        return timeA - timeB
                      })
                      return (
                        <li key={idx}>
                          <h4>廳別: {item.room}</h4>
                          <p style={{ paddingLeft: '40px', textIndent: '-40px' }}>場次: {item.times.join(' ')}</p>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </Col>
              <Col xs={1} md={2} lg={2}></Col>
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default MoviesList
