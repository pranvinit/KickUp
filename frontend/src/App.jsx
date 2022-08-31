import "./App.scss";
import { useContext, useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages imports
import Home from "./pages/home/Home";
import Journey from "./pages/journey/Journey";
import Team from "./pages/team/Team";
import Store from "./pages/store/Store";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import NotFound from "./pages/notfound/Notfound";
import { AuthContext } from "./context/AuthContext";

// Components imports
import Navbar from "./components/navbar/Navbar";

const ProtectedRoute = ({ user }) => {
  return user ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  const { user, authorizeUser } = useContext(AuthContext);

  useEffect(() => {
    authorizeUser();
  }, []);

  return (
    <div className="app">
      <ToastContainer />
      <Router>
        <Navbar />
        <div className="contentWrapper">
          <Routes>
            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/" element={<Home />} />
              <Route path="/journey" element={<Journey />} />
              <Route path="/team" element={<Team />} />
              <Route path="/store" element={<Store />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
