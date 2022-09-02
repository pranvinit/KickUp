import "./navbar.scss";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

const Navbar = () => {
  const { user, logoutRequest } = useContext(AuthContext);
  const [sidebarVisibility, setSidebarVisibility] = useState(false);

  const handleLogout = async () => {
    try {
      logoutRequest();
      setSidebarVisibility(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img
          onClick={() => window.location.replace("/")}
          src="/assets/logo.png"
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
              The &nbsp; Journey
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
          <li className="profile" onClick={() => setSidebarVisibility(true)}>
            <img src="/assets/person.png" alt="profile" />
            <span>{user.username}</span>
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
      <div className="sidebar" data-visible={sidebarVisibility}>
        <div className="close">
          <img
            onClick={() => setSidebarVisibility(false)}
            src="/assets/close.png"
            alt="close"
            className="closeIcon"
          />
        </div>
        <div className="wrapper">
          <span className="logout sbItem" onClick={handleLogout}>
            Logout
          </span>
          <span className="sbItem" onClick={() => setSidebarVisibility(false)}>
            Orders
            <img
              className="ordersIcon"
              src="/assets/right-arrow.png"
              alt="orders"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
