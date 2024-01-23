import fetchData from "./fetchData";
import {
  Todo,
  DeleteTodoItemProps,
  SaveOrEditItemProps,
  EditItemProps,
  FetchTodosProps,
  LogoutUserProps,
  User,
  GetUsersListProps,
} from "../types/common";
import toastMessage from "./toastMessage";

// handle delete todo item
export const handleDeleteTodoItem = async ({
  setIsLoading,
  setTodos,
  setIsModalOpen,
  todo,
}: DeleteTodoItemProps) => {
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

// handling todo save and edit
export const handleSaveEdit = async ({
  setIsLoading,
  setIsModalOpen,
  setEditableItemID,
  setDescription,
  setTitle,
  setTodos,
  editableItemID,
  title,
  description,
}: SaveOrEditItemProps) => {
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

// handle edit todo item, no more than getting todo data and opening modal
export const handleSetBeforeEdit = async ({
  setIsLoading,
  setTitle,
  setDescription,
  setIsModalOpen,
  setEditableItemID,
  todoID,
}: EditItemProps) => {
  try {
    setIsLoading(true);
    const resItem = await fetchData("GET", `todos/${todoID}`);
    if (resItem.status === 200) {
      setTitle(resItem.data.title);
      setDescription(resItem.data.description);
      setEditableItemID(todoID);
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

// fetching todos list
export const fetchTodosList = async ({
  setIsLoading,
  setTodos,
  userData,
}: FetchTodosProps) => {
  try {
    setIsLoading(true);
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

          // if the user is ADMIN, he can edit and delete all items, otherwise if the user is a USER
          // he can only edit delete items created by USER, otherwise, can't edit and delete
          isEditable:
            userData.role === "admin"
              ? true
              : createdBy === "admin"
              ? false
              : true,
        };
      });

      setTodos(newTodos);
    }
  } catch (error: any) {
    throw new Error(error.message);
  } finally {
    setIsLoading(false);
  }
};

// handling user logout
export const handleUserLogout = async ({
  setIsModalOpen,
  setUserData,
}: LogoutUserProps) => {
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

// handling fetch users
export const fetchUsersList = async ({
  setIsLoading,
  setUsers,
}: GetUsersListProps) => {
  try {
    setIsLoading(true);

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
  } catch (error: any) {
    throw new Error(error.message);
  } finally {
    setIsLoading(false);
  }
};
