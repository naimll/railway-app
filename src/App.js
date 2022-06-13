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

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} exact />
          <Route path="/register" element={<RegisterForm />} exact />
          <Route exact element={<PrivateRoute />}>
            <Route path="/client" element={<UserDashboard />} exact />
          </Route>
          {/* <Fragment>
            <PrivateRoute path="/admin/:id" exact component={AdminDashboard} />
          </Fragment> */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
