import React, { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import useAuth from "../../Hooks/useAuth";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const { RegisterUser, authError, isLoading } = useAuth();
  const [passwordError, setPasswordError] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "password") {
      setPasswordError("");
      setPasswordWarning("");
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, name, role } = formData;

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    RegisterUser(email, password, name, role);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container w-50">
      <h1 className="text-warning text-center py-4">
        Become a member? Register now
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="form-outline mb-4">
          <label htmlFor="name" className="form-label fw-semibold text-secondary">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-outline mb-4">
          <label htmlFor="email" className="form-label fw-semibold text-secondary">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-outline mb-4">
          <label htmlFor="password" className="form-label fw-semibold text-secondary">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            onFocus={() => {
              if (!passwordError) {
                setPasswordWarning("Password should be strong (min 6 characters).");
              }
            }}
            onBlur={() => {
              if (!passwordError) {
                setPasswordWarning("");
              }
            }}
            className="form-control"
            required
          />
          {passwordWarning && <p className="text-info mt-1">{passwordWarning}</p>}
          {passwordError && <p className="text-danger mt-1">{passwordError}</p>}
        </div>

        <div className="form-outline mb-4">
          <label htmlFor="role" className="form-label fw-semibold text-secondary">
            Role
          </label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="user">User</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        {authError && <p className="text-danger">{authError}</p>}

        <button
          type="submit"
          className="btn btn-warning text-white rounded-0 fw-semibold btn-block mb-4"
        >
          Sign up
        </button>

        <p className="text-center">
          Already have an account? <Link to="/login">Login</Link> now.
        </p>
      </form>
    </div>
  );
};

export default Register;
