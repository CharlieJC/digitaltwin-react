import LoginForm from "../components/login-form";
import { Grid, Button } from "@mui/material";
import { NavLink } from "react-router-dom";


const LoginPage = () => {
  return (
    <Grid container spacing={2} style={{ textAlign: "center" }}>
      <Grid item xs={12} style={{ textAlign: "start" }}>
      <NavLink to="/"><Button variant="text">back</Button></NavLink>
      </Grid>
      <Grid item xs={12}>
        <h2>Login to your account!</h2>
      </Grid>
      <Grid item xs={12}>
        <LoginForm />
      </Grid>
      <Grid item xs={12}>
      <p>Don't have an account? <NavLink to="/register">Create one here</NavLink></p>
      </Grid>
    </Grid>
  );
};

export default LoginPage;