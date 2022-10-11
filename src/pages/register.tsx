import RegisterForm from "../components/register-form";
import { Grid } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";

const RegisterPage = () => {
  return (
    <Grid container spacing={2} style={{ textAlign: "center" }}>
      <Grid item xs={12}>
        <Toolbar />
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