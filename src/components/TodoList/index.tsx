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
import fetchData from "../../utils/fetchData";
import toastMessage from "../../utils/toastMessage";
import { modalStyle } from "../../constants";
import { EditTodoFunction } from "../../types/common";

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
    try {
      setIsLoading(true);

      const body = {
        title,
        description,
      };

      // which means, if we are creating an item
      if (editableItemID === null) {
        const res = await fetchData("POST", "todos", body);
        if (res.status === 201) {
          const { id, title, description, createdBy } = res.data;
          setTodos((todos: Todo[]) => {
            return [
              ...todos,
              {
                id,
                title,
                description,
                createdBy,
                isEditable: true,
              },
            ];
          });

          toastMessage("success");

          setTitle("");
          setDescription("");
          setIsModalOpen(false);
        }
      }

      // which means, we are updating a specific item
      else {
        const res = await fetchData("PUT", `todos/${editableItemID}`, body);
        if (res.status === 204) {
          setTodos((lastTodos: Todo[]) => {
            return lastTodos.map((item) => {
              if (item.id === editableItemID) {
                return {
                  ...item,
                  title,
                  description,
                };
              } else {
                return item;
              }
            });
          });

          toastMessage("success");
          setTitle("");
          setDescription("");
          setIsModalOpen(false);
        } else {
          setIsModalOpen(false);
        }

        // need to set id null again as it will affect later
        setEditableItemID(null);
      }
    } catch (error: any) {
      toastMessage("error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // handling modal cancel
  const handleCancel = () => {
    setIsModalOpen(false);
    setTitle("");
    setDescription("");
  };

  // handle edit todo item, no more than getting todo data and opening modal
  const handleEditTodoItem: EditTodoFunction = async (id: number) => {
    try {
      setIsLoading(true);
      const resItem = await fetchData("GET", `todos/${id}`);
      if (resItem.status === 200) {
        setTitle(resItem.data.title);
        setDescription(resItem.data.description);
        setEditableItemID(id);
      } else {
        setIsModalOpen(false);
        setEditableItemID(null);
      }
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
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
