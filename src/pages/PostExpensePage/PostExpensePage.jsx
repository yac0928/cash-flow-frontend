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
// eslint-disable-next-line
export default function PostExpensePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { params } = location.state
  // const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [amount, setAmount] = useState(0)
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
    if (CheckValidInput(name, 'name')) return
    if (CheckValidInput(amount, 'amount', 999999, 0)) return
    if (CheckValidInput(paymentYears, 'paymentYears', 3, 0)) return
    if (paymentYears > 0 && CheckValidInput(paymentPerMonth, 'paymentPerMonth', 12, 1)) return
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
    const { success, newExpenses } = await postExpense(newData)
    if (success) {
      noty('Expense created successfully', 'success')
      if (Array.isArray(newExpenses)) {
        // 如果 newExpenses 是数组，则遍历并显示每个新支出的信息
        newExpenses.forEach((expense, i) => {
          noty(`New expense ${i + 1}: Date - ${expense.date.split('T')[0]}, Name - ${expense.name}`, 'information')
        })
      } else if (typeof newExpenses === 'object' && newExpenses !== null) {
        // 如果 newExpenses 是对象，则直接使用 noty 函数显示信息
        noty(`New expense: Date - ${newExpenses.date.split('T')[0]}, Name - ${newExpenses.name}`, 'information')
      }

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
          <EditExpenseInputBox label='Amount' type='number' value={amount} onChange={(e) => setAmount(Number(e.target.value))} note='0-999999' />
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
          <EditExpenseInputBox label='PaymentYears' type='number' value={paymentYears} onChange={(e) => setPaymentYears(Number(e.target.value))} max={3} min={0} note='0-3' />
        </Form.Group>
        {paymentYears > 0 &&
          <Form.Group controlId="formPaymentPerMonth">
            <EditExpenseInputBox label='PaymentPerMonth' type='number' value={paymentPerMonth} onChange={(e) => setPaymentPerMonth(Number(e.target.value))} max={12} min={1} note='1-12' />
          </Form.Group>
        }
      </Form>
      <Button onClick={() => backToExpensesPage()} variant="secondary">Back</Button>
      <Button variant="primary" onClick={handlePostExpense}>Create</Button>
    </Container>
  )
}
