import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
// components
import EditExpenseInputBox from '../../components/Input/EditExpenseInputBox.jsx'
// api
import { editExpense, putExpense } from '../../apis/expenses.js'
// utils
import noty from '../../utils/Noty.js'
import CheckValidInput from '../../utils/CheckValidInput.js'

export default function EditExpense ({ setIsAuthenticated }) {
  const location = useLocation()
  const { expense } = location.state
  // const [date, setDate] = useState('')
  const [name, setName] = useState(expense.name)
  const [amount, setAmount] = useState(expense.amount)
  const [categoryId, setCategoryId] = useState(expense.Category.id)
  const [paymentId, setPaymentId] = useState(expense.Payment.id)
  const [comment, setComment] = useState(expense.comment)
  // const [paymentMonth, setPaymentMonth] = useState('')
  // const [paymentDay, setPaymentDay] = useState('')
  const [categoriesData, setCategoriesData] = useState(null)
  const [paymentMethodsData, setPaymentMethodsData] = useState(null)
  const navigate = useNavigate()
  // 登入功能
  const handleEditExpense = async () => {
    CheckValidInput(name, 'name')
    CheckValidInput(amount, 'amount')
    const updatedData = {
      name,
      amount,
      categoryId,
      paymentId,
      comment
    }
    const { success, updatedExpense } = await putExpense(expense.id, updatedData)
    if (success) {
      noty('Expense updated successfully', 'success')
      console.log('updatedExpense: ', updatedExpense)
      navigate('/expenses')
    } else {
      noty('Failed to update expense!', 'error')
    }
  }

  useEffect(() => {
    const getData = async () => {
      const { success, categories, payments } = await editExpense(expense.id)
      if (success) {
        setCategoriesData(categories)
        setPaymentMethodsData(payments)
      } else {
        noty('Failed to get data!', 'error')
      }
    }
    getData()
  }, [])
  return (
    <>
      <Form>
        <Form.Group controlId="formName">
          <EditExpenseInputBox
            label='Name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={25}
          />
        </Form.Group>
        <Form.Group controlId="formAmount">
          <EditExpenseInputBox
            label='Amount'
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            max={9999999}
          />
        </Form.Group>
        <Form.Group controlId="formCategory">
          <EditExpenseInputBox
            label='Category'
            type='select'
            value={categoryId}
            options={categoriesData}
            onChange={(e) => setCategoryId(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPayment">
          <EditExpenseInputBox
            label='Payment'
            type='select'
            value={paymentId}
            options={paymentMethodsData}
            onChange={(e) => setPaymentId(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formComment">
          <EditExpenseInputBox
            label='Comment'
            type='text'
            value={comment || ''}
            onChange={(e) => setComment(e.target.value)}
            maxLength={50}
          />
        </Form.Group>
      </Form>
      <Button variant="primary" onClick={handleEditExpense}>
        Submit
      </Button>
    </>
  )
}
