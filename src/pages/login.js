import React from "react"
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="limiter">
      <div className="container-login100" style={{ backgroundImage: `url(${require("../../src/images/bg-01.jpg")})` }}>
        <div className="wrap-login100">
          <form className="login100-form validate-form">
            {/* <span className="login100-form-logo"> */}
            <div className="logo">

            </div>
            {/* </span> */}

            <span className="login100-form-title p-b-34 p-t-27">
              Log in
					</span>

            <div className="wrap-input100 validate-input" data-validate="Enter username">
              <input className="input100" type="text" name="username" placeholder="Username" />
            </div>

            <div className="wrap-input100 validate-input" data-validate="Enter password">
              <input className="input100" type="password" name="pass" placeholder="Password" />
            </div>

            <div className="contact100-form-checkbox">
              <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
              <Link to="/forget-password" className="forget-password-description">
                Forgot Password?
              </Link>
            </div>

            <div className="container-login100-form-btn">
              <Link to="/home">
                <button className="login100-form-btn forms-button">
                  Login
              </button>
              </Link>
            </div>

            <div className="text-center new-to-description p-t-90">
              New to Digital Try Room?
              <Link to="/sign-up" className="sign-up-link">
                Sign up
						  </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;