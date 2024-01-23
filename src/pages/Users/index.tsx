import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/common";
import "../../assets/css/fonts.css";
import LoaderComponent from "../../components/Loader";
import { fetchUsersList } from "../../utils/api";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  maxWidth: "100%",
}));

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Users = () => {
  const [users, setUsers] = useState<User[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // fetching all users list
  useEffect(() => {
    const fetchUsers = async () => {
      await fetchUsersList({ setIsLoading, setUsers });
    };

    fetchUsers();
  }, []);

  

  // handling navigating to home page
  const handleGoHome = () => {
    navigate("/");
  };

  if (isLoading) return <LoaderComponent />;

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          width: "50%",
          height: "60%",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          m: "auto",
          mt: 5,
        }}
      >
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Users List
        </Typography>
        <Box
          sx={{
            minHeight: 300,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            overflowY: "auto",
            mb: 2,
          }}
        >
          {users ? (
            users.map((user: User, index: number) => {
              const { role, name } = user;
              return (
                <Item
                  key={index}
                  sx={{
                    width: "100%",
                    my: 2,
                    p: 2,
                  }}
                >
                  <Stack spacing={2} direction="row" alignItems="center">
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        color: "#fff",
                        fontFamily: "Space Grotesk, sans-serif",
                      }}
                    >
                      {role.toUpperCase()}
                    </Avatar>
                    <Typography
                      variant="h6"
                      sx={{ fontFamily: "Dosis, sans-serif" }}
                    >
                      {name}
                    </Typography>
                  </Stack>
                </Item>
              );
            })
          ) : (
            <Typography variant="h5" sx={{ textAlign: "center", marginTop: 5 }}>
              NO AVAILABLE USERS, TRY TO REFRESH THE PAGE OR ADD USERS
            </Typography>
          )}
        </Box>

        {/* Back to home button */}
        <Button
          variant="contained"
          sx={{ alignSelf: "flex-end" }}
          onClick={handleGoHome}
        >
          Back to HOME
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default Users;
