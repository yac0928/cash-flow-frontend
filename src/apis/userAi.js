import axiosInstance from './axiosConfig.js'

export const userAiInput = async (userInput) => {
  try {
    const { data: responseData } = await axiosInstance.post('/user-ai-input', userInput)
    if (responseData) {
      return { success: true, outputMessages: responseData.outputMessages }
    }
  } catch (error) {
    console.error('[Get All Post Failed]:', error)
    return { success: false }
  }
}
