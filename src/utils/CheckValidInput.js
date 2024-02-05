import noty from './Noty.js'
const CheckValidInput = (label, context) => {
  if (typeof label === 'string') {
    if (label.trim().length === 0) {
      noty(`Please enter a valid ${context}`, 'error')
      return
    }
  } else if (typeof label === 'number') {
    if (label > 1000000) {
      noty(`Please enter a valid ${context}`, 'error')
      return
    }
  }
}

export default CheckValidInput
