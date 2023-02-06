// import logo from './logo.svg';
import * as React from 'react'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import { Navigate, Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import TwinPage from './components/twin'
import dtTheme from './theme'
import { UserContextProvider, UserContext } from './user-context'
import DashboardController from './controllers/dashboard/dashboard-controller'
import LoginController from './controllers/login/login-controller'
import RegisterController from './controllers/register/register-controller'
import ConnectController from './controllers/connect/connect-controller'
// https://blog.testdouble.com/posts/2019-11-04-react-mvc/
// https://vectr.com/design/editor/a4f48c30-9256-4c31-a00b-43caea5b2a9c

function App() {
  const { userData, setUserData, processToken } = React.useContext(UserContext)

  React.useEffect(() => {
    processToken()
  }, [])

  return (
    <ThemeProvider theme={dtTheme()}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path='/'
            element={userData ? <Navigate to='/dashboard' /> : <ConnectController />}
          />
          <Route
            path='/login'
            element={userData ? <Navigate to='/dashboard' /> : <LoginController />}
          />
          <Route
            path='/register'
            element={userData ? <Navigate to='/dashboard' /> : <RegisterController />}
          />
          <Route path='/twin' element={<TwinPage />} />
          <Route path='/dashboard' element={<DashboardController />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
