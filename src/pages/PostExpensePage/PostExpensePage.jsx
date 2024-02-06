import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Button, Form } from 'react-bootstrap'
// components
import EditExpenseInputBox from '../../components/Input/EditExpenseInputBox.jsx'
// api
import { postExpense, createExpense } from '../../apis/expenses.js'
// utils
import noty from '../../utils/Noty.js'
import CheckValidInput from '../../utils/CheckValidInput.js'

export default function PostExpensePage () {
  const navigate = useNavigate()
  const location = useLocation()
  const { params } = location.state
  // const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [amount, setAmount] = useState(1)
  const [categoryId, setCategoryId] = useState(1)
  const [paymentId, setPaymentId] = useState(1)
  const [comment, setComment] = useState(null)
  const [paymentYears, setPaymentYears] = useState(0)
  const [paymentPerMonth, setPaymentPerMonth] = useState(0)
  const [categoriesData, setCategoriesData] = useState(null)
  const [paymentMethodsData, setPaymentMethodsData] = useState(null)
  // 登入功能
  const backToExpensesPage = () => {
    navigate(`/expenses?year=${params.year}&month=${params.month}&day=${params.day}&categoryId=`, { state: { params } })
  }
  const handlePostExpense = async () => {
    CheckValidInput(name, 'name')
    CheckValidInput(amount, 'amount')
    const newData = {
      date: new Date(Date.UTC(params.year, params.month - 1, params.day)),
      name,
      amount,
      categoryId,
      paymentId,
      paymentYears,
      paymentPerMonth,
      comment
    }

    console.log(newData)
    const { success, newExpenses } = await postExpense(newData)
    if (success) {
      noty('Expense created successfully', 'success')
      console.log('createdExpenses: ', newExpenses)
      navigate(
        `/expenses?year=${params.year}&month=${params.month}&day=${params.day}&categoryId=`,
        { state: { params } }
      )
    } else {
      noty('Failed to create expenses!', 'error')
    }
  }
  useEffect(() => {
    const getData = async () => {
      const { success, categories, payments } = await createExpense()
      if (success) {
        setCategoriesData(categories)
        setPaymentMethodsData(payments)
      } else {
        noty('Failed to get data!', 'error')
      }
    }
    getData()
  }, [])
  useEffect(() => {
    if (paymentYears <= 0) {
      setPaymentPerMonth(0)
    }
  }, [paymentYears])
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
        <Form.Group controlId="formPaymentYears">
          <EditExpenseInputBox label='PaymentYears' type='number' value={paymentYears} onChange={(e) => setPaymentYears(e.target.value)} max={3} min={0} note='0-3' />
        </Form.Group>
        {paymentYears > 0 &&
          <Form.Group controlId="formPaymentPerMonth">
            <EditExpenseInputBox label='PaymentPerMonth' type='number' value={paymentPerMonth} onChange={(e) => setPaymentPerMonth(e.target.value)} max={12} min={1} note='1-12' />
          </Form.Group>
        }
      </Form>
      <Button onClick={() => backToExpensesPage()} variant="secondary">Back</Button>
      <Button variant="primary" onClick={handlePostExpense}>Create</Button>
    </Container>
  )
}
