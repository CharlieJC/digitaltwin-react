import { useNavigate } from 'react-router-dom'
import { deleteTwin } from '../../models/dashboard-model'
import DashboardTwin from '../../components/dashboard/dashboard-twin'

type TwinControllerProps = {
  id: string
  code: number
  refresh: () => void
}

const DashboardTwinController = (props: TwinControllerProps) => {
  const { id, code, refresh } = props
  const navigate = useNavigate()

  const onConnect = () => {
    navigate('/twin')
  }

  const onDelete = () => {
    const token = localStorage.getItem('token')
    if (token == null || token === undefined) return
    const fetchData = async () => {
      const twinsData = await deleteTwin(token, id)
      refresh()
    }

    fetchData().catch(console.error)
  }

  return <DashboardTwin code={code} onConnect={onConnect} onDelete={onDelete} />
}

export default DashboardTwinController
