import axiosInstance from './axiosConfig.js'

export const getMovies = async () => {
  try {
    const { data: responseData } = await axiosInstance.get('/movies')
    if (responseData) {
      return { success: true, movies: responseData.movies }
    }
  } catch (error) {
    console.error('[Get All Post Failed]:', error)
    return { success: false }
  }
}

export const postMovies = async () => {
  try {
    const { data: responseData } = await axiosInstance.post('/movies')
    if (responseData) {
      return {
        success: true,
        movies: responseData.movies,
        screenings: responseData.screenings
      }
    }
  } catch (error) {
    console.error('[Get All Post Failed]:', error)
    return { success: false }
  }
}
