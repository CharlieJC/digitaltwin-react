import ConnectForm from "../components/connect-form";
import { Grid, Button } from "@mui/material";
import { NavLink } from "react-router-dom";


const ConnectPage = () => {
  return (
    <Grid container spacing={2} style={{ textAlign: "center" }}>
      <Grid item xs={12} style={{ textAlign: "start" }}>
      <Button variant="text">back</Button>
      </Grid>
      <Grid item xs={12}>
        <h2>Enter code to connect!</h2>
      </Grid>
      <Grid item xs={12}>
        <ConnectForm />
      </Grid>
      <Grid item xs={12}>
      <p>Create your own twin? <NavLink to="/login">Sign in here</NavLink></p>
      </Grid>
    </Grid>
  );
};

export default ConnectPage;