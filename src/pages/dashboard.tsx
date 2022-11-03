import { Grid, Link, Button, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DashboardTwinCard from '../components/dashboard-card'

type TwinDataState = {
  id: string
  code: number
  ownerId: string
}
const DashboardPage = () => {
  const [value, setValue] = useState<boolean>(true)
  const refresh = () => {
    setValue(!value)
  }

  const [twins, setTwins] = useState<TwinDataState[]>()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('id')
    if (id === '' || id === null) {
      return
    }
    if (token == null || token === undefined) return
    fetch(
      `${process.env.REACT_APP_API_HOST}api/twins/allByOwner?${new URLSearchParams({
        secret_token: token,
      })}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          id,
        }),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setTwins(data)
      })
  }, [value])

  const onCreate = () => {
    const id = localStorage.getItem('id')
    if (id === '' || id === null) {
      return
    }
    const token = localStorage.getItem('token')
    if (token == null || token === undefined) return
    fetch(
      `${process.env.REACT_APP_API_HOST}api/twins/?${new URLSearchParams({
        secret_token: token,
      })}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          ownerId: id,
        }),
      },
    ).then(() => {
      refresh()
    })
  }

  return (
    <div>
      <Button component={RouterLink} to='/' style={{ position: 'absolute' }}>
        Exit
      </Button>
      <Grid
        container
        direction='column'
        justifyContent='top'
        alignItems='center'
        style={{ minHeight: '100vh', paddingTop: '20px' }}
      >
        {twins?.map((twin) => (
          <Grid item key={twin.id} xs={12} sx={{ p: 1 }}>
            <DashboardTwinCard code={twin.code} id={twin.id} refresh={refresh} />
          </Grid>
        ))}

        <Grid item xs={12} sx={{ p: 1 }}>
          <IconButton size='large' onClick={onCreate}>
            <AddCircleIcon fontSize='inherit' />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  )
}

export default DashboardPage
