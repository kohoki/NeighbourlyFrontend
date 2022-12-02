import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://calm-lime-cobra-gear.cyclic.app";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { username, email, password };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/signup`, requestBody)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div /*className="SignupPage"*/ className="backgroundColor">
      <h1 className="textColor">
        Don't already have an account? Sign up today
      </h1>

      <form onSubmit={handleSignupSubmit}>
        <div className="mb-3" style={{ width: "30vw" }}>
          <label className="textColor">Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsername}
            className="form-control"
          />
        </div>
        <div className="mb-3" style={{ width: "30vw" }}>
          <label for="exampleInputEmail1" className="form-label textColor">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            className="form-control"
            id="exampleInputEmail1"
          />
        </div>
        <div className="mb-3" style={{ width: "30vw" }}>
          <label for="exampleInputPassword1" className="form-label textColor">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-light">
          Sign Up
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="textColor">Already have account?</p>
      <Link className="btn btn-light" to={"/login"}>
        {" "}
        Login
      </Link>
    </div>
  );
}

export default Signup;
