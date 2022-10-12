import RegisterForm from "../components/register-form";
import { Grid,Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const RegisterPage = () => {
  return (
    <Grid container spacing={2} style={{ textAlign: "center" }}>
      <Grid item xs={12} style={{ textAlign: "start" }}>
      <NavLink to="/login"><Button variant="text">back</Button></NavLink>
      </Grid>
      <Grid item xs={12}>
        <h2>Create a new account!</h2>
      </Grid>
      <Grid item xs={12}>
        <RegisterForm />
      </Grid>
    </Grid>
  );
};

export default RegisterPage;