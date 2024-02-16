import axiosInstance from './axiosConfig.js'

export const getCategories = async () => {
  try {
    const { data: responseData } = await axiosInstance.get('/categories')
    if (responseData) {
      return { success: true, categories: responseData.categories }
    }
  } catch (error) {
    console.error('[Get All Post Failed]:', error)
    return { success: false }
  }
}
