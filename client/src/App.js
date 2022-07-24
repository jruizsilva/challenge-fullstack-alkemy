import { Login, Register, Home } from "./components";

import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { login } from "./redux/reducers/user";

function App() {
  const { user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(token);
    if (token) {
      axios
        .get("/api/users/token", {
          headers: {
            "x-token": token,
          },
        })
        .then((res) => {
          console.log(res.data);
          dispatch(login({ user: res.data }));
          Swal.fire(
            "Credenciales válidas.",
            "Has iniciado sesión correctamente",
            "success"
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Home /> : <Navigate to="/login" replace={true} />}
        />
        <Route
          exact
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" replace={true} />}
        />
        <Route
          exact
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" replace={true} />}
        />
      </Routes>
    </div>
  );
}

export default App;
