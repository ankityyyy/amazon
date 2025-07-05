
import { loginUser } from '../redux/feature/User';
import React, { useState } from "react";
import "../styles/Login.css"

const Login=() => {
  const [isLogin, setIsLogin] = useState(true);
  const [logEmail, setLogEmail] = useState("");
  const [logPass, setLogPass] = useState("");
  const [logName, setLogName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for submit
    alert(isLogin ? "Logging in..." : "Signing up...");
  };

  return (
    <div className="section">
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 className="mb-0 pb-3" style={{cursor:"pointer"}}>
                <span onClick={() => setIsLogin(true)}>Log In </span>
                <span onClick={() => setIsLogin(false)}>Sign Up</span>
              </h6>
              <input
                className="checkbox"
                type="checkbox"
                id="reg-log"
                name="reg-log"
                checked={!isLogin}
                readOnly
              />
              <label htmlFor="reg-log"></label>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  {/* Log In Form */}
                  <div className={`card-front ${isLogin ? "active" : ""}`}>
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Log In</h4>
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-style"
                              placeholder="Your Email"
                              value={logEmail}
                              onChange={(e) => setLogEmail(e.target.value)}
                              required
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              className="form-style"
                              placeholder="Your Password"
                              value={logPass}
                              onChange={(e) => setLogPass(e.target.value)}
                              required
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button type="submit" className="btn mt-4">
                            Submit
                          </button>

                          <div className="form-group mt-4 text-center">
  <button
    type="button"
    // onClick={handleGoogleLogin}
    className="btn d-flex align-items-center justify-content-center gap-2"
    style={{
      background: "#fff",
      color: "#444",
      border: "1px solid #ddd",
      borderRadius: "5px",
      padding: "8px 16px",
      fontWeight: "500",
    }}
  >
    <img
  src="https://developers.google.com/identity/images/g-logo.png"
  alt="Google logo"
  width="20"
  height="20"
/>

    <span>Sign in with Google</span>
  </button>
</div>

                        </form>
                       
                      </div>
                    </div>
                  </div>

                  {/* Sign Up Form */}
                  <div className={`card-back ${!isLogin ? "active" : ""}`}>
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Sign Up</h4>
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-style"
                              placeholder="Your Full Name"
                              value={logName}
                              onChange={(e) => setLogName(e.target.value)}
                              required
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="email"
                              className="form-style"
                              placeholder="Your Email"
                              value={logEmail}
                              onChange={(e) => setLogEmail(e.target.value)}
                              required
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              className="form-style"
                              placeholder="Your Password"
                              value={logPass}
                              onChange={(e) => setLogPass(e.target.value)}
                              required
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button type="submit" className="btn mt-4">
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;













