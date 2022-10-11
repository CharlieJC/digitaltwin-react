// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Box } from "@mui/material";

const RegisterForm = () => {

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ display: "flex" }}
    >
      <form>
        <Grid container spacing={2} style={{}}>
          <Grid item xs={12}>
            <Box sx={{ flexDirection: "column", display: "flex" }}>
              <TextField id="email" label="Email" variant="outlined" />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ flexDirection: "column", display: "flex" }}>
              <TextField id="username" label="Username" variant="outlined" />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ flexDirection: "column", display: "flex" }}>
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                inputProps={{ type: "password" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ flexDirection: "column", display: "flex" }}>
              <Button variant="outlined" type="submit">
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default RegisterForm;