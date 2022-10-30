import React, { useEffect, useState } from 'react'
// import logo from './logo.svg';
import useMediaQuery from '@mui/material/useMediaQuery'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'

import RegisterPage from './pages/register'
import LoginPage from './pages/login'
import ConnectPage from './pages/connect'
import TwinPage from './pages/twin'
import DashboardPage from './pages/dashboard'

// https://blog.testdouble.com/posts/2019-11-04-react-mvc/
// https://vectr.com/design/editor/a4f48c30-9256-4c31-a00b-43caea5b2a9c
interface UserInfo {
  id: string
  email: string
  username: string
}
function App() {
  const [userInfo, setUserInfo] = useState<UserInfo>({ id: '', email: '', username: '' })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token == null || token === undefined) return
    fetch(
      `${process.env.REACT_APP_API_HOST}api/auth/isAuth?${new URLSearchParams({
        secret_token: token,
      })}`,
    )
      .then((res) => res.json())
      .then((data) => {
        const { id, email, username } = data.user
        if (id === '') {
          localStorage.removeItem('token')
          return
        }
        setUserInfo({ id, email, username })
      })
  }, [])

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  )
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/' element={<ConnectPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/twin' element={<TwinPage />} />
          <Route path='/dashboard' element={<DashboardPage id={userInfo.id} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
