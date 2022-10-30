import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import DashboardTwinCard from './dashboard-card'

type DashboardCollectionProps = {
  id: string
}

type TwinDataState = {
  id: string
  code: number
  ownerId: string
}

const TwinCardCollection: React.FC<DashboardCollectionProps> = (
  props: DashboardCollectionProps,
) => {
  const [twins, setTwins] = useState<TwinDataState[]>()

  useEffect(() => {
    const { id } = props
    const token = localStorage.getItem('token')
    if (token == null || token === undefined) return
    fetch(
      `${process.env.REACT_APP_API_HOST}api/twins/allByOwner?${new URLSearchParams({
        secret_token: token,
      })}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          code: id,
        }),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setTwins(data)
      })
  })

  return <div />
}
