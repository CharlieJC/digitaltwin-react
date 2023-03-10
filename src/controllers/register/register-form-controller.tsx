import { useNavigate } from 'react-router-dom'
import RegisterForm from '../../components/register/register-form'
import { registerUser } from '../../models/auth-model'

const RegisterFormController = () => {
  const navigate = useNavigate()

  const handleRegister = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const { email, username, password } = {
      email: (form.email as HTMLInputElement).value,
      username: (form.username as HTMLInputElement).value,
      password: (form.password as HTMLInputElement).value,
    }

    const fetchData = async () => {
      const user = await registerUser(email, username, password)
      return user
    }

    fetchData()
      .then((user) => {
        if (user) {
          navigate('/login')
        }
      })
      .catch(console.error)
  }
  return <RegisterForm handleRegister={handleRegister} />
}

export default RegisterFormController
