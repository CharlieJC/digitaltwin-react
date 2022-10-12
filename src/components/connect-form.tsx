// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

import { TextField, Button, Grid, Box } from "@mui/material";

const connectForm = () => {

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
              <TextField id="code" label="Twin Code" variant="outlined" />
            </Box>
          </Grid>


          <Grid item xs={12}>
            <Box sx={{ flexDirection: "column", display: "flex" }}>
              <Button variant="outlined" type="submit">
                Connect
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default connectForm;