import axiosInstance from './axiosConfig.js'

// 取得所有路徑
export const getCalendar = async () => {
  try {
    const { data: responseData } = await axiosInstance.get('/')
    if (responseData) {
      return {
        success: true,
        expenses: responseData.expenses
      }
    }
  } catch (error) {
    console.error('[Get All Post Failed]:', error)
    return { success: false }
  }
}

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

export const editExpense = async (expenseId) => {
  try {
    const { data: responseData } = await axiosInstance.get(`/expenses/${expenseId}/edit`)
    if (responseData) {
      return {
        success: true,
        expense: responseData.expense,
        categories: responseData.categories,
        payments: responseData.payments
      }
    }
  } catch (error) {
    console.error('[Get All Post Failed]:', error)
    return { success: false }
  }
}

export const createExpense = async () => {
  try {
    const { data: responseData } = await axiosInstance.get('/expenses/create')
    if (responseData) {
      return {
        success: true,
        categories: responseData.categories,
        payments: responseData.payments
      }
    }
  } catch (error) {
    console.error('[Get All Post Failed]:', error)
    return { success: false }
  }
}

export const postExpense = async (expenseData) => {
  try {
    const { data: responseData } = await axiosInstance.post('/expenses', expenseData)
    if (responseData) {
      return {
        success: true,
        newExpenses: responseData.newExpenses
      }
    }
  } catch (error) {
    console.error('[Get All Post Failed]:', error)
    return { success: false }
  }
}

export const putExpense = async (expenseId, updatedData) => {
  try {
    const { data: responseData } = await axiosInstance.put(`/expenses/${expenseId}`, updatedData)
    if (responseData) {
      return {
        success: true,
        updatedExpense: responseData.updatedExpense
      }
    }
  } catch (error) {
    console.error('[Get All Post Failed]:', error)
    return { success: false }
  }
}

export const deleteExpense = async (expenseId) => {
  try {
    const { data: responseData } = await axiosInstance.delete(`/expenses/${expenseId}`)
    if (responseData) {
      return {
        success: true,
        deletedExpenses: responseData.deletedExpenses
      }
    }
  } catch (error) {
    console.error('[Get All Post Failed]:', error)
    return { success: false }
  }
}
