import { useEffect, useState } from 'react'
import * as React from 'react'
import { Twin, fetchTwins, createTwin } from '../../models/twin-model'
import DashboardPage from '../../components/dashboard/dashboard-page'
import { UserContext } from '../../user-context'

const DashboardController = () => {
  // const [value, setValue] = useState<boolean>()
  const { userData, setUserData, processToken } = React.useContext(UserContext)
  const { loggedIn, user } = userData
  const [twins, setTwins] = useState<Twin[]>()

  const removeTwin = (id: string) => {
    if (!twins) return
    setTwins(twins.filter((twin) => twin.id !== id))
  }

  useEffect(() => {
    if (!loggedIn || !user) return
    const token = localStorage.getItem('token')
    const { id } = user
    if (id === '' || id === null) {
      return
    }
    if (token == null || token === undefined) return

    const fetchData = async () => {
      const twinsData = await fetchTwins(token, id)
      setTwins(twinsData)
    }

    fetchData().catch(console.error)
  }, [])

  const onCreate = () => {
    if (!loggedIn || !user) return
    const token = localStorage.getItem('token')
    const { id } = user
    if (id === '' || id === null) {
      return
    }
    if (token == null || token === undefined) return

    const fetchData = async () => {
      const twinData = await createTwin(token, id)
      return twinData
    }

    fetchData()
      .then((twin) => {
        if (!twin) return

        if (!twins) {
          setTwins([twin])
        } else {
          setTwins([...twins, twin])
        }
      })
      .catch(console.error)
  }

  return <DashboardPage twins={twins} onCreate={onCreate} removeTwin={removeTwin} />
}

export default DashboardController
