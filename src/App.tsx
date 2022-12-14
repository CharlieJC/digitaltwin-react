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

function App() {
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
          <Route path='/dashboard' element={<DashboardPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
