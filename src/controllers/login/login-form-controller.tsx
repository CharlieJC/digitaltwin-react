import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../../components/login/login-form'
import { loginUser } from '../../models/auth-model'
import { UserContext } from '../../user-context'

const LoginFormController = () => {
  const { userData, setUserData, processToken } = React.useContext(UserContext)
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const credentials = {
      email: (form.email as HTMLInputElement).value,
      password: (form.password as HTMLInputElement).value,
    }

    const fetchData = async () => {
      const { token, user } = await loginUser(credentials.email, credentials.password)

      if (token && user) {
        localStorage.removeItem('token')
        localStorage.setItem('token', token)
        return user
      }
      return undefined
    }

    fetchData()
      .then((user) => {
        navigate('/dashboard')
        setUserData({ loggedIn: true, user })
      })
      .catch(console.error)
  }
  return <LoginForm handleLogin={handleLogin} />
}

export default LoginFormController
