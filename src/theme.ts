import { useMediaQuery, createTheme } from '@mui/material'
import * as React from 'react'

const dtTheme = () => {
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
  return theme
}

export default dtTheme
