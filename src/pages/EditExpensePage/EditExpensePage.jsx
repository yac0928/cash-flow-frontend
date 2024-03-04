import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Button, Form } from 'react-bootstrap'
// components
import EditExpenseInputBox from '../../components/Input/EditExpenseInputBox.jsx'
// api
import { editExpense, putExpense } from '../../apis/expenses.js'
// utils
import noty from '../../utils/Noty.js'
import CheckValidInput from '../../utils/CheckValidInput.js'

export default function EditExpensePage () {
  const navigate = useNavigate()
  const location = useLocation()
  const { params, expenseId } = location.state
  const [name, setName] = useState('')
  const [amount, setAmount] = useState(0)
  const [categoryId, setCategoryId] = useState('')
  const [paymentId, setPaymentId] = useState('')
  const [comment, setComment] = useState('')
  const [categoriesData, setCategoriesData] = useState(null)
  const [paymentMethodsData, setPaymentMethodsData] = useState(null)
  // 登入功能
  const backToExpensesPage = () => {
    navigate(`/expenses?year=${params.year}&month=${params.month}&day=${params.day}&categoryId=`, { state: { params } })
  }
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
    const { success, updatedExpense } = await putExpense(expenseId, updatedData)
    if (success) {
      noty('Expense updated successfully', 'success')
      console.log('updatedExpense: ', updatedExpense)
      navigate(
        `/expenses?year=${params.year}&month=${params.month}&day=${params.day}&categoryId=`,
        { state: { params } }
      )
    } else {
      noty('Failed to update expense!', 'error')
    }
  }
  useEffect(() => {
    const getData = async (id) => {
      const { success, expense, payments } = await editExpense(id)
      if (success) {
        setName(expense.name)
        setAmount(expense.amount)
        setCategoryId(expense.Category.id)
        setPaymentId(expense.Payment.id)
        setComment(expense.comment)
        setPaymentMethodsData(payments)
      } else {
        noty('Failed to get data!', 'error')
      }
    }
    getData(expenseId)
    const user = JSON.parse(localStorage.getItem('User'))
    setCategoriesData(user.Categories)
  }, [expenseId])
  return (
    <Container>
      <h2 className="mt-4">Edit Expense:</h2>
      <Form>
        <Form.Group controlId="formName">
          <EditExpenseInputBox label='Name' type='text' value={name} onChange={(e) => setName(e.target.value)} maxLength={25} />
        </Form.Group>
        <Form.Group controlId="formAmount">
          <EditExpenseInputBox label='Amount' type='number' value={amount} onChange={(e) => setAmount(e.target.value)} max={9999999} min={0} note='0-9999999' />
        </Form.Group>
        <Form.Group controlId="formCategory">
          <EditExpenseInputBox label='Category' type='select' value={categoryId} options={categoriesData} onChange={(e) => setCategoryId(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formPayment">
          <EditExpenseInputBox label='Payment' type='select' value={paymentId} options={paymentMethodsData} onChange={(e) => setPaymentId(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formComment">
          <EditExpenseInputBox label='Comment' type='text' value={comment || ''} onChange={(e) => setComment(e.target.value)} maxLength={50} />
        </Form.Group>
      </Form>
      <Button onClick={() => backToExpensesPage()} variant="secondary">Back</Button>
      <Button variant="primary" onClick={handleEditExpense}>Save</Button>
    </Container>
  )
}
