import { ReactElement, ReactNode, SetStateAction } from "react";
import { ToastPosition } from "react-toastify";

export interface CustomHeaders {
  "Content-Type": string;
}

export interface User {
  login?: string;
  role: string;
  name: string;
}

export interface UserContextInterface {
  userData: User;
  setUserData: (userData: User) => void;
}

export interface Props {
  children?: ReactNode;
}

export interface ErrorState {
  hasError: boolean;
}

export interface CustomModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  children: ReactElement;
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  createdBy: string;
  isEditable?: boolean;
}

export interface Todos {
  todos: Todo[] | undefined;
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
  isModalOpen: boolean;
  setIsModalOpen: any;
}

export interface EditTodoFunction {
  (id: number): Promise<void>;
}

export interface TodoPiece {
  todo: Todo;
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
  handleEditTodoItem: EditTodoFunction;
  setIsParentModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

export interface ToastContent {
  position: ToastPosition;
  autoClose: number;
  pauseOnHover: boolean;
  closeOnClick: boolean;
}

export interface DeleteTodoItemProps {
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  todo: Todo;
}

// Reusable interface
interface SetterFunctions {
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  setEditableItemID: React.Dispatch<SetStateAction<number | null>>;
  setDescription: React.Dispatch<SetStateAction<string>>;
  setTitle: React.Dispatch<SetStateAction<string>>;
}

export interface SaveOrEditItemProps extends SetterFunctions {
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
  editableItemID: number | null;
  title: string;
  description: string;
}

export interface EditItemProps extends SetterFunctions {
  todoID: number;
}

export interface FetchTodosProps {
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
  userData: User;
}

export interface LogoutUserProps {
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  setUserData: React.Dispatch<SetStateAction<any>>;
}

export interface GetUsersListProps {
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
  setUsers: React.Dispatch<SetStateAction<User[] | undefined>>;
}
