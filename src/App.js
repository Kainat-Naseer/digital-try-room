// 1. Install dependencies
// 2. Import dependencies
// 3. Setup webcam and canvas
// 4. Define references to those
// 5. Load handpose
// 6. Detect function
// 7. Draw using drawMask

import React, { useRef } from "react";
// import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './pages/login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import ForgetPassword from './pages/ForgetPassword';
import "./App.css";
import 'react-material-iconic-font';
import "react-fontawesome";

function App() {
  return (
    <div className="App">

      <Router>
        <Switch>

          <Route path="/" exact>
            <Login/>
          </Route>

          <Route path="/log-in">
            <Login />
          </Route>

          <Route path="/sign-up">
            <SignUp />
          </Route>

          <Route path="/forget-password">
            <ForgetPassword />
          </Route>

          <Route path="/home">
            <Home />
          </Route>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
