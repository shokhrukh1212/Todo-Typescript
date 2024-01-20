import { useState, useEffect, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import FormatListNumberedRtlOutlinedIcon from "@mui/icons-material/FormatListNumberedRtlOutlined";
import PeopleIcon from "@mui/icons-material/People";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CustomModal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import { MyContext } from "../../MyContext";
import { Todo } from "../../types/common";
import TodoList from "../../components/TodoList";
import ErrorBoundaryComponent from "../../components/ErrorBoundary";
import { modalStyle } from "../../constants";

const defaultTheme = createTheme();

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const { userData, setUserData } = useContext(MyContext);
  const [todos, setTodos] = useState<Todo[]>([]);

  const navigate = useNavigate();

  // fetching todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetchData("GET", "todos");

        if (res.status === 200) {
          const newTodos = res.data.map((card: Todo) => {
            const { id, title, description, createdBy } = card;
            return {
              key: id,
              id,
              title,
              description,
              createdBy,
              isEditable: userData.role === "admin" ? true : false,
            };
          });

          setTodos(newTodos);
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    };

    fetchTodos();
  }, [userData.role]);

  // handling logout
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status === 200) {
        setIsModalOpen(false);
        setUserData({ name: "", role: "" });
        sessionStorage.clear();
      } else {
        setIsModalOpen(false);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  // handling navigating to users page
  const handleUsers = () => {
    navigate("/users");
  };

  // handling cancel for modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // handling adding a todo, no more than opening a modal here
  const handleAddTodo = () => {
    setIsAddModalOpen(true);
  };

  return (
    <ErrorBoundaryComponent>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar
            sx={{
              width: "100%",
              m: "auto",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              color="inherit"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <FormatListNumberedRtlOutlinedIcon sx={{ mr: 2 }} />
              TODO List
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <Typography variant="h6" color="inherit" sx={{ marginRight: 1 }}>
                Logout
              </Typography>
              <LogoutIcon />
            </Box>
          </Toolbar>
        </AppBar>
        <main>
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                TODO LIST
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                Stay organized with our intuitive <b>TODO list app</b>.
                Effortlessly manage tasks, set priorities, and boost
                productivity. Simplify your day-to-day with ease.
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained" onClick={handleAddTodo}>
                  <AddCircleOutlineOutlinedIcon sx={{ mr: 1, fontSize: 30 }} />
                  add new todo
                </Button>
                {userData.role === "admin" && (
                  <Button variant="outlined" onClick={handleUsers}>
                    <PeopleIcon sx={{ mr: 1, fontSize: 30 }} />
                    users list
                  </Button>
                )}
              </Stack>
            </Container>
          </Box>

          {/* Todo list component */}
          <TodoList
            todos={todos}
            setTodos={setTodos}
            isModalOpen={isAddModalOpen}
            setIsModalOpen={setIsAddModalOpen}
          />

          {/* Our custom modal to user logout */}
          <CustomModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          >
            <Box sx={modalStyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Are you sure you want to logout?
              </Typography>
              <Box
                sx={{ alignSelf: "flex-end", paddingRight: 5, paddingTop: 2 }}
              >
                <Button variant="contained" onClick={handleLogout}>
                  Yes
                </Button>
                <Button
                  variant="outlined"
                  sx={{ marginLeft: 2 }}
                  onClick={handleCancel}
                >
                  No
                </Button>
              </Box>
            </Box>
          </CustomModal>
        </main>
      </ThemeProvider>
    </ErrorBoundaryComponent>
  );
};

export default Main;