import LoginForm from "../components/login-form";
import { Grid } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";

const LoginPage = () => {
  return (
    <Grid container spacing={2} style={{ textAlign: "center" }}>
      <Grid item xs={12}>
        <Toolbar />
      </Grid>
      <Grid item xs={12}>
        <h2>Login to your account!</h2>
      </Grid>
      <Grid item xs={12}>
        <LoginForm />
      </Grid>
    </Grid>
  );
};

export default LoginPage;