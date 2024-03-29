import React, { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { TodoPiece } from "../../types/common";
import CustomModal from "../Modal";
import { Box } from "@mui/material";
import { modalStyle } from "../../constants";
import { handleDeleteTodoItem } from "../../utils/api";
import "../../assets/css/fonts.css";

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
    await handleDeleteTodoItem({
      setIsLoading,
      setTodos,
      setIsModalOpen,
      todo,
    });
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
      <Card>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            sx={{ fontFamily: "Ubuntu, sans-serif" }}
          >
            {todo.title}
          </Typography>
          <Divider light />
          <Typography
            sx={{
              overflow: "auto",
              minHeight: 50,
              maxHeight: 50,
              overflowY: "auto",
              pt: 1,
              mb: 2,
              fontFamily: "Sevillana, cursive",
            }}
          >
            {todo.description}
          </Typography>

          <Typography sx={{ fontFamily: "Prompt, sans-serif" }}>
            Created by: <b>{todo.createdBy.toUpperCase()}</b>
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleEdit(todo.id)}
            disabled={!todo.isEditable}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="outlined"
            disabled={!todo.isEditable}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>

      {/* Our custom modal to delete a todo item */}
      <CustomModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Box sx={modalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontFamily: "'Play', sans-serif" }}
          >
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
