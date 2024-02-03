import axiosInstance from './axiosConfig.js'

// 取得所有路徑
export const getExpenses = async (queryParams) => {
  try {
    const { data: responseData } = await axiosInstance.get('/expenses', { params: queryParams })
    if (responseData) {
      return {
        success: true,
        expenses: responseData.expenses,
        categories: responseData.categories,
        categoryId: responseData.categoryId,
        totalAmount: responseData.totalAmount
      }
    }
  } catch (error) {
    console.error('[Get All Post Failed]:', error)
    return { success: false }
  }
}

export const getExpense = async (expenseId) => {
  try {
    const { data: responseData } = await axiosInstance.get(`/expenses/${expenseId}`)
    if (responseData) {
      return {
        success: true,
        expense: responseData.expense
      }
    }
  } catch (error) {
    console.error('[Get All Post Failed]:', error)
    return { success: false }
  }
}

export const deleteExpense = async (queryParams) => {
  try {
    const { data: responseData } = await axiosInstance.get('/expenses', { params: queryParams })
    if (responseData) {
      return {
        success: true,
        expenses: responseData.expenses,
        categories: responseData.categories,
        categoryId: responseData.categoryId,
        totalAmount: responseData.totalAmount
      }
    }
  } catch (error) {
    console.error('[Get All Post Failed]:', error)
    return { success: false }
  }
}
