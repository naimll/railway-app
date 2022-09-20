import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Outlet } from "react-router-dom";
import LoginForm from "../containers/LoginForm/LoginForm";

export const PrivateRoute = ({ ...props }) => {
  const dispatch = useDispatch();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const role = useSelector((state) => state.auth.role);
  const isAuthenticated = () => {
    if (localStorage.getItem("token") === null) {
      return false;
    } else {
      return true;
    }
  };
  // if (localStorage.getItem("token") === null) {
  //   setIsAuthenticated(false);
  // } else {
  //   setIsAuthenticated(true);
  // }

  return isAuthenticated() ? (
    role === props.role ? (
      <Outlet {...props} />
    ) : (
      <Navigate to={"/"} />
    )
  ) : (
    <Navigate to={`/login`} exact component={LoginForm} />
  );
};
