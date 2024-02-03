import { useState, useEffect } from 'react'

export default function InputBox ({
  label,
  type,
  value,
  onChange,
  maxLength,
  setIsError
}) {
  const [errorMessage, setErrorMessage] = useState('')

  // 檢查password輸入內容是否符合要求
  const checkPassword = () => {
    if (value.length === 20) {
      setErrorMessage('字數上限20字！')
    } else if (value.includes(' ')) {
      setErrorMessage('不可使用空格！')
    } else {
      setErrorMessage('')
    }
  }

  // 檢查name
  const checkName = () => {
    const whitespaceRegex = /^\s*$/

    if (value.length === 30) {
      setErrorMessage('字數上限30字！')
    } else if (whitespaceRegex.test(value) && value.length !== 0) {
      setErrorMessage('請輸入內容！')
    } else {
      setErrorMessage('')
    }
  }

  // 檢查email
  const checkEmail = () => {
    const whitespaceRegex = /^\s*$/

    if (value.length === 100) {
      setErrorMessage('字數上限100字！')
    } else if (whitespaceRegex.test(value) && value.length !== 0) {
      setErrorMessage('請輸入內容！')
    } else {
      setErrorMessage('')
    }
  }
  // 不確定到底有沒有問題，最後的[]
  useEffect(() => {
    if (label === 'Password' || label === 'PasswordConfirm') {
      checkPassword()
    } else if (label === 'Name') {
      checkName()
    } else if (label === 'Email') {
      checkEmail()
    }
  }, [value, label])

  useEffect(() => {
    if (errorMessage !== '') {
      setIsError(true)
    } else {
      setIsError(false)
    }
  }, [errorMessage, setIsError])

  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        type={type || 'text'}
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        maxLength={maxLength || ''}
      />
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  )
}
