import { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [formInput, setFormInput] = useState({});
  const navigate = useNavigate();
  const { isFetching, error, loginRequest } = useContext(AuthContext);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formInput.email || !formInput.password) return;
    await loginRequest(formInput);
    navigate("/");
  };

  const handleDemo = async () => {
    await loginRequest({ email: "demo@gmail.com", password: "secret" });
    navigate("/");
  };

  return (
    <div className="login">
      <form className="box" onSubmit={handleSubmit}>
        <h3>Sign in to KicksUp</h3>
        <div className="field">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formInput.email || ""}
            onChange={handleChange}
            placeholder="Enter Email Address"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formInput.password || ""}
            onChange={handleChange}
            placeholder="Enter Password"
            required
          />
        </div>

        <div className="actions">
          <div>
            <button className="submit" type="submit" disabled={isFetching}>
              Login
            </button>
            <button
              className="submit"
              type="button"
              onClick={handleDemo}
              disabled={isFetching}
            >
              Demo
            </button>
          </div>
          <button
            className="cancel"
            type="button"
            onClick={() => setFormInput({})}
            disabled={isFetching}
          >
            Cancel
          </button>
        </div>
        <div className="create">
          <span>New to KicksUp?</span>
          <Link to="/register">Create an account</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
