// import logo from './logo.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import TwinPage from './components/twin'

import dtTheme from './theme'
import { UserContextProvider } from './user-context'
import DashboardController from './controllers/dashboard/dashboard-controller'
import LoginController from './controllers/login/login-controller'
import RegisterController from './controllers/register/register-controller'
import ConnectController from './controllers/connect/connect-controller'

// https://blog.testdouble.com/posts/2019-11-04-react-mvc/
// https://vectr.com/design/editor/a4f48c30-9256-4c31-a00b-43caea5b2a9c

function App() {
  return (
    <UserContextProvider>
      <ThemeProvider theme={dtTheme()}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path='/' element={<ConnectController />} />
            <Route path='/login' element={<LoginController />} />
            <Route path='/register' element={<RegisterController />} />
            <Route path='/twin' element={<TwinPage />} />
            <Route path='/dashboard' element={<DashboardController />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </UserContextProvider>
  )
}

export default App
