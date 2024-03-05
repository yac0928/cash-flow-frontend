import axios from 'axios'
const baseURL = 'https://cash-flow-api.zeabur.app/api'
// const baseURL = 'http://localhost:3000/api'

// 使用者登入
export const login = async ({ email, password }) => {
  try {
    const { data: responseData } = await axios.post(`${baseURL}/signin`, {
      email,
      password
    })
    if (responseData) {
      return {
        success: true,
        token: responseData.token,
        currentUser: responseData.user
      }
    }
  } catch (error) {
    console.error('[Login Failed]:', error)
    return { success: false }
  }
}

// 註冊
export const signUp = async ({ name, email, password, passwordConfirm }) => {
  try {
    const { data: responseData } = await axios.post(`${baseURL}/signup`, {
      name,
      email,
      password,
      passwordConfirm
    })
    if (responseData) {
      return {
        success: true,
        newUser: responseData.newUser
      }
    }
  } catch (error) {
    console.error('[Register Failed]: ', error)
    return { success: false }
  }
}
