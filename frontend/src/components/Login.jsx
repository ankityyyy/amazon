import React, { useState } from 'react'
import { loginUser } from "../redux/feature/User";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner.jsx";


 const Login = () => {
     const {error} = useSelector((state) => state.user);
      const dispatch = useDispatch();
      const navigate = useNavigate();

     let [formData,setFormData]=useState({
          email:null,
          password:null,
     })

     const handleFormData=(e)=>{
          let {name,value}=e.target;
          setFormData((prev)=>(
               {...prev,[name]:value}
          ))

     }
console.log(formData.email,formData.password);

     const handleSubmit=(e)=>{
           e.preventDefault();
           dispatch(loginUser(formData))
           .unwrap()
      .then((res) => {
        console.log("login successful:", res);
        navigate("/");
      })
      .catch((err) => {
        console.error("login failed:", err);
      });

     }
const handleGoogleLogin = () => {
    window.location.href ="https://amazon-backend-i8vp.onrender.com/auth/google";
  };


  return (
    <>
    
    <h1 className="col-6 offset-3 mt-5">Login</h1>
      <div className="row mt-3  mb-5">
        <div className="col-6 offset-3">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                email
              </label>
              <input
                name="email"
                id="username"
                value={formData.email}
                onChange={handleFormData}
                type="text"
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                name="password"
                id="password"
                value={formData.password}
                onChange={handleFormData}
                type="password"
                className="form-control"
                required
              />
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <button className="btn btn-success position-relative " style={{left:"310px"}}>Login</button>

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
  )
}





export default Login