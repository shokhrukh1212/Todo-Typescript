import React, { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import CustomModal from "../Modal";
import TodoItem from "../Todo";
import { Todos, Todo } from "../../types/common";
import { modalStyle } from "../../constants";
import { handleSaveEdit, handleSetBeforeEdit } from "../../utils/api";

const TodoList: React.FC<Todos> = ({
  todos,
  setTodos,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [editableItemID, setEditableItemID] = useState<number | null>(null);
  const maxTitleLength = 20;

  // handling todo save and edit
  const handleSave = async () => {
    await handleSaveEdit({
      setIsLoading,
      setIsModalOpen,
      setEditableItemID,
      setDescription,
      setTitle,
      setTodos,
      editableItemID,
      title,
      description,
    });
  };

  // handling modal cancel
  const handleCancel = () => {
    setIsModalOpen(false);
    setTitle("");
    setDescription("");
  };

  // handle edit todo item, no more than getting todo data and opening modal
  const handleEditTodoItem = async (id: number) => {
    await handleSetBeforeEdit({
      setIsLoading,
      setTitle,
      setDescription,
      setIsModalOpen,
      setEditableItemID,
      todoID: id,
    });
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {todos ? (
          todos.map((todo: Todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              setTodos={setTodos}
              setIsParentModalOpen={setIsModalOpen}
              handleEditTodoItem={handleEditTodoItem}
            />
          ))
        ) : (
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            Your todo list is empty! This might be due to an error or you
            haven't created any
          </Typography>
        )}
      </Grid>

      {/* Custom modal for creating or updating a todo item */}
      <CustomModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Box component="form" sx={modalStyle} noValidate autoComplete="off">
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h4"
            style={{
              alignSelf: "center",
              marginBottom: 15,
              fontFamily: "'Play', sans-serif",
            }}
          >
            {editableItemID ? "EDIT YOUR TODO !!!" : "ADD NEW TODO !!!"}
          </Typography>
          <TextField
            id="outlined-textarea"
            label="* Title"
            placeholder="Reading a book"
            variant="outlined"
            style={{ width: "100%", marginBottom: 20 }}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (e.target.value.length > maxTitleLength) setIsDisabled(true);
              else setIsDisabled(false);
            }}
            error={title.length > maxTitleLength}
            helperText={
              title.length > maxTitleLength
                ? `Max ${maxTitleLength} characters allowed for title`
                : ""
            }
          />
          <TextField
            id="outlined-textarea"
            label="* Description"
            placeholder="Reading at least 5 pages"
            variant="outlined"
            style={{ width: "100%" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
          />
          <Box
            sx={{
              alignSelf: "flex-end",
              paddingTop: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!title || !description || isDisabled}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="outlined"
              sx={{ marginLeft: 2 }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </CustomModal>
    </Container>
  );
};

export default TodoList;
