import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./containers/LoginForm/LoginForm";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import { PrivateRoute } from "./Authentication/PrivateRoute";
import UserDashboard from "./containers/UserDashboard/UserDashboard";
import AdminDashboard from "./containers/AdminDashboard/AdminDashboard";
import RegisterForm from "./containers/RegisterForm/RegisterForm";
import { Fragment } from "react";
import AddAttraction from "./components/Attraction/AddAttraction";
import { useSelector } from "react-redux";
import AddStation from "./components/Stations/AddStation";
import AddRoute from "./components/Route/AddRoute";

function App() {
  const role = useSelector((state) => state.auth.role);
  console.log(role);
  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={
            role === "Admin" ? (
              <Navigate to="/admin" />
            ) : (
              <Navigate to="/client" />
            )
          }
        />
        <Route path="/login" element={<LoginForm />} exact />
        <Route path="/register" element={<RegisterForm />} exact />
        <Route exact element={<PrivateRoute role="Client" />}>
          <Route path="/client" element={<UserDashboard />} exact />
        </Route>
        <Route exact element={<PrivateRoute role="Admin" />}>
          <Route path="/admin" element={<AdminDashboard />} exact />
        </Route>

        <Route exact element={<PrivateRoute role="Admin" />}>
          <Route path="/add-attraction" element={<AddAttraction />} exact />
        </Route>
        <Route exact element={<PrivateRoute role="Admin" />}>
          <Route path="/add-station" element={<AddStation />} exact />
        </Route>
        <Route exact element={<PrivateRoute role="Admin" />}>
          <Route path="/add-route" element={<AddRoute />} exact />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
