import noty from './Noty.js'
const CheckValidInput = (value, context, max, min) => {
  if (typeof value === 'string') {
    if (value.trim().length === 0) {
      noty(`Please enter a valid ${context}`, 'error')
      return true
    }
  } else if (typeof value === 'number') {
    if (isNaN(value) || value > max || value < min) {
      noty(`Please enter a valid ${context}`, 'error')
      return true
    }
  }
  return false
}

export default CheckValidInput
