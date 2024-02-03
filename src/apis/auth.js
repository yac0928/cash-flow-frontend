import axios from 'axios'
const baseURL = 'http://localhost:3000/api'

// 使用者登入
export const login = async ({ email, password }) => {
  try {
    const { data: responseData } = await axios.post(`${baseURL}/signin`, {
      email,
      password
    })
    if (responseData) {
      console.log(responseData)
      const { token } = responseData.data
      const currentUser = responseData.data.user
      return {
        token,
        currentUser
      }
    }
  } catch (error) {
    console.error('[Login Failed]:', error)
    const { message } = error.response.data
    return { success: false, message }
  }
}

// 註冊
export const signUp = async ({ name, email, password, passwordCheck }) => {
  try {
    const { data } = await axios.post(`${baseURL}/users`, {
      name,
      email,
      password,
      passwordCheck
    })
    const { status, message } = data

    if (status === 'success') {
      return { success: true, message }
    }

    return data
  } catch (error) {
    const { message } = error.response.data
    console.error('[Register Failed]: ', error)
    return { success: false, message }
  }
}
