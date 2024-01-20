import React, { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { TodoPiece } from "../../types/common";
import fetchData from "../../utils/fetchData";
import CustomModal from "../Modal";
import { Box } from "@mui/material";
import { Todo } from "../../types/common";
import toastMessage from "../../utils/toastMessage";
import { modalStyle } from "../../constants";

const TodoItem: React.FC<TodoPiece> = ({
  todo,
  setTodos,
  setIsParentModalOpen,
  handleEditTodoItem,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // handle delete todo item
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await fetchData("DELETE", `todos/${todo.id}`);

      // updating todos list
      if (res.status === 204) {
        setTodos((lastTodos: Todo[]) => {
          return lastTodos.filter((item) => item.id !== todo.id);
        });

        toastMessage("success");
        setIsModalOpen(false);
      }
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // handle close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // handle edit todo item
  const handleEdit = (id: number) => {
    // passing chosen todo item id via function to parent component
    handleEditTodoItem(id);

    // setting TodoList modal isModal to true when we click edit button
    setIsParentModalOpen(true);
  };

  return (
    <Grid item key={todo.id} xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {todo.title}
          </Typography>
          <Typography
            sx={{
              overflow: "auto",
              minHeight: 50,
              maxHeight: 50,
              overflowY: "auto",
            }}
          >
            {todo.description}
          </Typography>
          <Typography>
            <u>Created by:</u> <b>{todo.createdBy.toUpperCase()}</b>
          </Typography>
        </CardContent>
        {todo.isEditable && (
          <CardActions>
            <Button
              size="small"
              variant="outlined"
              onClick={() => handleEdit(todo.id)}
            >
              Edit
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Delete
            </Button>
          </CardActions>
        )}
      </Card>

      {/* Our custom modal to delete a todo item */}
      <CustomModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete?
          </Typography>
          <Box sx={{ alignSelf: "flex-end", paddingRight: 5, paddingTop: 2 }}>
            <Button variant="contained" onClick={handleDelete}>
              {isLoading ? "Deleting..." : "Yes"}
            </Button>
            <Button
              variant="outlined"
              sx={{ marginLeft: 2 }}
              onClick={handleCloseModal}
            >
              No
            </Button>
          </Box>
        </Box>
      </CustomModal>
    </Grid>
  );
};

export default TodoItem;
