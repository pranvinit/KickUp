import "./navbar.scss";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logoutRequest } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      logoutRequest();
    } catch (err) {
      console.log(err);
    }
  };

  console.log(user);

  return (
    <div className="navbar">
      <div className="logo">
        <img
          onClick={() => window.location.replace("/")}
          src="assets/logo.png"
          alt="logo"
        />
      </div>
      {user && (
        <ul className="navlist center">
          <li>
            <NavLink className="item" activeclassname="active" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="item" activeclassname="active" to="/journey">
              The Journey
            </NavLink>
          </li>
          <li>
            <NavLink className="item" activeclassname="active" to="/team">
              Team
            </NavLink>
          </li>
          <li>
            <NavLink className="item" activeclassname="active" to="/store">
              Store
            </NavLink>
          </li>
          <li>
            <NavLink className="item" activeclassname="active" to="/contact">
              Contact
            </NavLink>
          </li>
        </ul>
      )}
      <ul className="navlist right">
        {user && (
          <li className="profile">
            <img src="assets/person.png" alt="profile" />
            <span>{user.name}</span>
          </li>
        )}
        {user && (
          <li className="logout" onClick={handleLogout}>
            Logout
          </li>
        )}
        {!user && (
          <li>
            <NavLink className="item" activeclassname="active" to="/login">
              Login
            </NavLink>
          </li>
        )}
        {!user && (
          <li>
            <NavLink className="item" activeclassname="active" to="/register">
              Register
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
