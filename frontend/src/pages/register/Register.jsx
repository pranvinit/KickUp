import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";
import "./register.scss";

const Register = () => {
  const [formInput, setFormInput] = useState({});
  const navigate = useNavigate();
  const { isFetching, registerRequest } = useContext(AuthContext);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(formInput);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formInput.username || !formInput.email || !formInput.password) return;
    await registerRequest(formInput);
    navigate("/");
  };

  return (
    <div className="register">
      <form className="box" onSubmit={handleSubmit}>
        <h3>Sign up to KicksUp</h3>
        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formInput.username || ""}
            onChange={handleChange}
            placeholder="Enter Name"
            required
          />
        </div>
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
          <button className="submit" type="submit" disabled={isFetching}>
            Register
          </button>
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
          <span>Already have an account?</span>
          <Link to="/login">Sign in</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
