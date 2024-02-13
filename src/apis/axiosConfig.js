import axios from 'axios'
const baseURL = 'http://localhost:3000/api'
const axiosInstance = axios.create({ baseURL })

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('Token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  }
)

export default axiosInstance
