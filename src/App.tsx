import { lazy, useState, useEffect } from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import { MyContext } from "./MyContext";
import { ToastContainer } from "react-toastify";
import { User } from "./types/common";
import "react-toastify/dist/ReactToastify.css";

// our lazy imports, which means we can only load them when we need
const Main = lazy(() => import("./pages/Main"));
const Login = lazy(() => import("./pages/Login"));
const Users = lazy(() => import("./pages/Users"));

function App() {
  const [userData, setUserData] = useState<User>({ name: "", role: "" });

  // after each refresh, userdata can persist
  useEffect(() => {
    const value = sessionStorage.getItem("userdata");

    if (value) {
      const parsedValue = value ? JSON.parse(value) : { name: "", role: "" };
      setUserData(parsedValue);
    }
  }, []);

  // every time userdata changes with a valid value, we can restore in sessionStorage
  useEffect(() => {
    if (userData.name || userData.role) {
      const userDataString = JSON.stringify(userData);
      sessionStorage.setItem("userdata", userDataString);
    }
  }, [userData]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={userData.role ? <Main /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={userData.role ? <Main /> : <Login />} />
        <Route path="/users" element={<Users />} />
      </>
    )
  );

  return (
    <>
      <ToastContainer />
      <MyContext.Provider value={{ userData, setUserData }}>
        <RouterProvider router={router} />
      </MyContext.Provider>
    </>
  );
}

export default App;
