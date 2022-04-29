import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./containers/LoginForm/LoginForm";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import RegisterForm from "./containers/RegisterForm/RegisterForm";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} exact />
          <Route path="/register" element={<RegisterForm />} exact />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
