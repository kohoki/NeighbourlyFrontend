import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, password };

    axios
      .post(`${API_URL}/login`, requestBody)
      .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data.authToken
        console.log("JWT token", response.data.authToken);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/home");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div /*className="LoginPage"*/ className="backgroundColor">
      <h1 className="textColor">Login</h1>

      <form onSubmit={handleLoginSubmit}>
        <div className="mb-3">
          <label className="textColor">Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsername}
            className="form-control"
          />
        </div>
        <div className="mb-3">
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
          Login
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="textColor">Don't have an account yet?</p>
      <Link className="btn btn-light" to={"/signup"}>
        {" "}
        Sign Up
      </Link>
    </div>
  );
}

export default Login;
