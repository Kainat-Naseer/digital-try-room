import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const SignUp = () => {

  return (
    <div className="limiter">
      <div className="container-login100" style={{ backgroundImage: `url(${require("../src/images/bg-01.jpg")})` }}>
        <div className="wrap-login100">
          <form className="login100-form validate-form">
            {/* <span className="login100-form-logo"> */}
            <div className="logo">

            </div>
            {/* </span> */}

            <span className="login100-form-title p-b-34 p-t-27">
              Sign Up
					</span>

            <div className="wrap-input100 validate-input" data-validate="Enter username">
              <input className="input100" type="text" name="username" placeholder="Username" />
            </div>

            <div className="wrap-input100 validate-input" data-validate="Enter email">
              <input className="input100" type="password" name="email" placeholder="Email" />
            </div>

            <div className="wrap-input100 validate-input" data-validate="Enter password">
              <input className="input100" type="password" name="pass" placeholder="Password" />
            </div>

            <div className="wrap-input100 validate-input" data-validate="Enter password">
              <input className="input100" type="password" name="passAxgain" placeholder="Confirm Password" />
            </div>

            <div className="contact100-form-checkbox">
              <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
              <label className="already-have-an-account-description">
                Already have an account?
						</label>
              <Link to="/log-in" className="login">Log In</Link>
            </div>

            <div className="container-login100-form-btn">
              <button className="login100-form-btn">
                Sign Up
						</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp;