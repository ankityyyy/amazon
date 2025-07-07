import { loginUser } from "../redux/feature/User";
import React, { useState } from "react";


const SignUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [logEmail, setLogEmail] = useState("");
  const [logPass, setLogPass] = useState("");
  const [logName, setLogName] = useState("");

  

  return (
   <>
      <div className="row mt-3">
        <div className="col-6 offset-3">
          <h2>Sign Up on Amazon</h2>
          <form className="needs-validation" noValidate>
          <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input name="email"  id="email" type="email" className="form-control" required />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone No</label>
              <input name="phone" id="phone" type="number" className="form-control" required />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input name="password"  id="password" type="password" className="form-control" required />
            </div>

            <button className="btn btn-success">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
