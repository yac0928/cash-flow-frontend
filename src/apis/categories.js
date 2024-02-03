import axios from './axiosConfig.js'
const baseURL = 'http://localhost:3000/api'

// 取得所有路徑
export const getCategories = async () => {
  try {
    const { data: responseData } = await axios.get(`${baseURL}/categories`)
    if (responseData) {
      return { success: true, categories: responseData.data.categories }
    }
  } catch (error) {
    console.error('[Get All Post Failed]:', error)
    return { success: false }
  }
}
