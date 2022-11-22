import { useNavigate } from 'react-router-dom'
import { deleteTwin } from '../../models/twin-model'
import DashboardTwin from '../../components/dashboard/dashboard-twin'

type TwinControllerProps = {
  id: string
  code: number
  removeTwin: (id: string) => void
}

const DashboardTwinController = (props: TwinControllerProps) => {
  const { id, code, removeTwin } = props
  const navigate = useNavigate()

  const onConnect = () => {
    navigate('/twin')
  }

  const onDelete = () => {
    const token = localStorage.getItem('token')
    if (token == null || token === undefined) return
    const fetchData = async () => {
      const twinsData = await deleteTwin(token, id)
      removeTwin(id)
    }

    fetchData().catch(console.error)
  }

  return <DashboardTwin code={code} onConnect={onConnect} onDelete={onDelete} />
}

export default DashboardTwinController
