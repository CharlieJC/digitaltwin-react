import { useNavigate } from 'react-router-dom'
import ConnectForm from '../../components/connect/connect-form'
import { verifyCode } from '../../models/twin-model'

const ConnectFormController = () => {
  const navigate = useNavigate()

  const handleConnect = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const code = Number((form.code as HTMLInputElement).value)

    const fetchData = async () => {
      const twin = await verifyCode(code)
      return twin
    }

    fetchData()
      .then((twin) => {
        if (twin) {
          navigate('/twin')
        }
      })
      .catch(console.error)
  }
  return <ConnectForm handleConnect={handleConnect} />
}

export default ConnectFormController
