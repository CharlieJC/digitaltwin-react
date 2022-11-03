import * as React from 'react'
import { createTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useNavigate } from 'react-router-dom'

type TwinCardProps = {
  id: string
  code: number
  refresh: () => void
}

export default function DashboardTwinCard(props: TwinCardProps) {
  const { id, code } = props
  const navigate = useNavigate()

  const onConnect = () => {
    navigate('/twin')
  }

  const onDelete = () => {
    const token = localStorage.getItem('token')
    if (token == null || token === undefined) return
    fetch(
      `${process.env.REACT_APP_API_HOST}api/twins/delete?${new URLSearchParams({
        secret_token: token,
      })}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          id,
        }),
      },
    ).then(() => {
      const { refresh } = props
      refresh()
    })
  }

  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component='div' variant='h5'>
            Twin ID: {code}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <Button variant='text' type='submit' onClick={onConnect}>
            Connect
          </Button>
          <Button variant='text' type='submit' onClick={onDelete}>
            Delete
          </Button>
        </Box>
      </Box>
    </Card>
  )
}
