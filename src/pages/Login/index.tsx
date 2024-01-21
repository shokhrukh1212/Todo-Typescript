import { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MyContext } from "../../MyContext";
import { useNavigate } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import toastMessage from "../../utils/toastMessage";

const defaultTheme = createTheme();

const Login = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const { setUserData } = useContext(MyContext);
  const navigate = useNavigate();

  // handling submit while logging in
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsClicked(true);

    if (login.length > 0 && password.length > 0) {
      const body = {
        login,
        password,
      };
      const res = await fetchData("POST", "login", body);

      if (res.status === 200) {
        toastMessage("success");
        setUserData(res.data);
        navigate("/");
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              name="login"
              autoComplete="login"
              autoFocus
              onChange={(e) => setLogin(e.target.value)}
              error={isClicked && login.length === 0}
              helperText={
                isClicked && login.length === 0 ? "Invalid login" : ""
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={"password"}
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              error={isClicked && password.length === 0}
              helperText={
                isClicked && password.length === 0 ? "Invalid password" : ""
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
