import {  Signup } from "../redux/feature/User";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner.jsx";
import React, { useState } from "react";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    number: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(Signup(formData))
      .unwrap()
      .then((res) => {
        console.log("Signup successful:", res);
        navigate("/");
      })
      .catch((err) => {
        console.error("Signup failed:", err);
      });
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <>
      <div className="row mt-5 mb-5">
        <div className="col-6 offset-3">
          <h2>Sign Up on Amazon</h2>
          <form className="needs-validation" onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                name="email"
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone No</label>
              <input
                name="number"
                id="phone"
                type="tel" 
                pattern="[0-9]{10}"

                value={formData.number}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                name="password"
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <button className="btn btn-success mb-3" style={{ position: "relative", left: "310px" }}>
              Sign Up
            </button>

            <hr />

            <div
              onClick={handleGoogleLogin}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                background: "white",
                cursor: "pointer",
                margin: "20px",
                maxWidth: "250px",
                position: "relative",
                left: "210px"
              }}
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google Logo"
                style={{ width: "20px", height: "20px" }}
              />
              <span style={{ fontFamily: "Arial, sans-serif", color: "#444" }}>
                Continue with Google
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
