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
import fetchData from "../../utils/fetchData";
import { User } from "../../types/common";

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
  const navigate = useNavigate();

  // fetching all users list
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetchData("GET", "users");
        if (res.status === 200) {
          const newUsers = res.data.map((user: User) => {
            const { name, role } = user;
            return {
              name,
              role,
            };
          });

          setUsers(newUsers);
        }
      } catch (error) {}
    };

    fetchUsers();
  }, []);

  // handling navigating to home page
  const handleGoHome = () => {
    navigate("/");
  };

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
            // width: "100%",
            height: 500,
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
                    <Avatar sx={{ width: 80, height: 80, color: "#fff" }}>
                      {role.toUpperCase()}
                    </Avatar>
                    <Typography variant="h6">{name}</Typography>
                  </Stack>
                </Item>
              );
            })
          ) : (
            <Typography variant="h3">NO AVAILABLE USERS</Typography>
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