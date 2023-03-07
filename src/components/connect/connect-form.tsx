import { TextField, Button, Grid, Box } from '@mui/material'

type ConnectFormProps = {
  handleConnect: (e: React.FormEvent<HTMLFormElement>) => void
}
const ConnectForm: React.FC<ConnectFormProps> = (props: ConnectFormProps) => {
  const { handleConnect } = props

  return (
    <Box display='flex' justifyContent='center' alignItems='center' sx={{ display: 'flex' }}>
      <form onSubmit={(event) => handleConnect(event)}>
        <Grid container spacing={2} style={{}}>
          <Grid item xs={12}>
            <Box sx={{ flexDirection: 'column', display: 'flex' }}>
              <TextField id='code' label='Twin Code' variant='outlined' />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ flexDirection: 'column', display: 'flex' }}>
              <Button variant='outlined' type='submit'>
                Connect
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default ConnectForm
