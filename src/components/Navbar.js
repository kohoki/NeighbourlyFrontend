import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
        <nav /*className="Navbar"*/ className="navbar navbar-expand-lg bg-light">
          {!isLoggedIn && (
        <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
        <li className="nav-item">
        <Link className="nav-link active" aria-current="page"  to="/signup">Register an Account</Link> 
        </li> 
        <li className="nav-item"> 
        <Link className="nav-link active" aria-current="page" to="/login">Log In to your Account</Link>
        </li> 
        <li className="nav-item"> 
        <Link className="nav-link active" aria-current="page" to="/about">About Neighbourly</Link> 
        </li> 
        <li className="nav-item"> 
        <Link className="nav-link active" aria-current="page" to="/help">Help</Link>
        </li> 
        </ul>
        </div>
        </div>
)}
        
        {isLoggedIn && (
        <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
        <li className="nav-item">
        <Link className="nav-link active" to="/home"><img src="https://res.cloudinary.com/dv6mgmdzd/image/upload/v1669730868/Project%203%20-%20Neighbourly/logo_cuaypn.png" alt="Logo"/></Link>  
        </li> 
        <li className="nav-item">
        <Link className="nav-link active" to={`/profile/${user._id}`}>{user.username}'s Profile</Link> 
        </li> 
        <li className="nav-item">
        <Link className="nav-link active" to="/borrow">Borrow</Link> 
        </li>
        <li className="nav-item">
        <Link className="nav-link active" to="/lend">Lend</Link>  
        </li>
        <li className="nav-item">
        <Link className="nav-link active" to="/messages">Messages</Link>   
        </li>
        <li className="nav-item">
        <Link className="nav-link active" to="/about">About Neighbourly</Link> 
        </li>   
        <li className="nav-item">
        <Link to="/help">Help</Link>    
        </li>
        <li className="nav-item">
        <Link className="nav-link active" onClick={logOutUser}>Logout</Link>
        </li>
        </ul>
        </div>
        </div>
        )}   
        </nav>
    )
}

export default Navbar;