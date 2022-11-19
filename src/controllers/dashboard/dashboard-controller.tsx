import { useEffect, useState } from 'react'
import * as React from 'react'
import { Twin, fetchTwins, createTwin } from '../../models/dashboard-model'
import DashboardPage from '../../components/dashboard/dashboard-page'
import { UserContext } from '../../user-context'

const DashboardController = () => {
  const [value, setValue] = useState<boolean>()
  const { userData, setUserData, processToken } = React.useContext(UserContext)

  const refresh = () => {
    setValue(!value)
  }

  const [twins, setTwins] = useState<Twin[]>()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('id')
    if (id === '' || id === null) {
      return
    }
    if (token == null || token === undefined) return

    const fetchData = async () => {
      const twinsData = await fetchTwins(token, id)
      setTwins(twinsData)
    }

    fetchData().catch(console.error)
  }, [value])

  const onCreate = () => {
    const id = localStorage.getItem('id')
    if (id === '' || id === null) {
      return
    }
    const token = localStorage.getItem('token')
    if (token == null || token === undefined) return

    const fetchData = async () => {
      const twinData = await createTwin(token, id)
      refresh()
    }

    fetchData().catch(console.error)
  }

  return <DashboardPage twins={twins} onCreate={onCreate} refresh={refresh} />
}

export default DashboardController
