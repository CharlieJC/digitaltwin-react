import React from 'react';
// import logo from './logo.svg';
import './App.css';
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import RegisterPage from "./pages/register"
import LoginPage from './pages/login';


// https://blog.testdouble.com/posts/2019-11-04-react-mvc/

function App() {

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<RegisterPage />}/>
          <Route path="/login" element={<LoginPage />}/>

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
