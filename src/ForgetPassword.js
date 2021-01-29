import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const ForgetPassword = (props) => {

  return (
    <div className="limiter">
      <div className="container-login100" style={{ backgroundImage: `url(${require("../src/images/bg-01.jpg")})` }}>
        <div className="wrap-login100">
          <form className="login100-form validate-form">

            <span className="login100-form-title reset-paswword-title p-b-34 p-t-27">
              Reset The Password
        </span>

            <div className="wrap-input100 validate-input" data-validate="Enter your registered Email">
              <input className="input100" type="text" name="username" placeholder="Enter your registered Email" />
            </div>

            <div>
              <div className="container-login100-form-btn forget-password-button">
                <button className="login100-form-btn">
                  Back
                </button>
              </div>


              <div className="container-login100-form-btn forget-password-button">
                <button className="login100-form-btn">
                  Send Email
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword;