import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav /*className="Navbar"*/ className="navbar navbar-expand-lg bg-light ">
      {!isLoggedIn && (
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item me-5">
                <Link
                  className="nav-link active navbar-brand"
                  aria-current="page"
                  to="/signup"
                >
                  Register an Account
                </Link>
              </li>
              <li className="nav-item me-5">
                <Link
                  className="nav-link active navbar-brand"
                  aria-current="page"
                  to="/login"
                >
                  Log In to Your Account
                </Link>
              </li>
              <li className="nav-item me-5">
                <Link
                  className="nav-link active navbar-brand"
                  aria-current="page"
                  to="/about"
                >
                  About Neighbourly
                </Link>
              </li>
              <li className="nav-item me-5">
                <Link
                  className="nav-link active navbar-brand"
                  aria-current="page"
                  to="/help"
                >
                  Help
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      {isLoggedIn && (
        <div>
          <div className="container-fluid ">
            <div className="collapse navbar-collapse " id="navbarNav">
              <ul className="navbar-nav ">
                <li className="nav-item">
                  <Link className="nav-link active me-5" to="/home">
                    <img
                      src="https://res.cloudinary.com/dv6mgmdzd/image/upload/v1669906029/Project%203%20-%20Neighbourly/logo_l9fp62.png"
                      alt="Logo"
                    />
                  </Link>
                </li>
                <li className="nav-item me-5">
                  <Link
                    className="nav-link active navbar-brand"
                    to={`/profile/${user._id}`}
                  >
                    {user.username}'s Profile
                  </Link>
                </li>
                <li className="nav-item me-5">
                  <Link className="nav-link active navbar-brand" to="/borrow">
                    Borrow
                  </Link>
                </li>
                <li className="nav-item me-5">
                  <Link className="nav-link active navbar-brand" to="/lend">
                    Lend
                  </Link>
                </li>
                <li className="nav-item me-5">
                  <Link className="nav-link active navbar-brand" to="/messages">
                    Messages
                  </Link>
                </li>
                <li className="nav-item me-5 ">
                  <Link className="nav-link active navbar-brand" to="/about">
                    About Neighbourly
                  </Link>
                </li>
                <li className="nav-item me-5 ">
                  <Link className="nav-link active navbar-brand" to="/help">
                    Help
                  </Link>
                </li>
                <li className="nav-item me-5">
                  <Link
                    className="nav-link active navbar-brand"
                    onClick={logOutUser}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
