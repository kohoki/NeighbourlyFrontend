import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
        <nav className="Navbar">
        {!isLoggedIn && (
  <>
        <Link className="Link" to="/signup">Register an Account</Link>    
        <Link className="Link" to="/login">Log In to your Account</Link>
        <Link to="/about">About Neighbourly</Link>    
        <Link to="/help">Help</Link> 
        </>
)}
        {isLoggedIn && (
  <>
        <Link to="/home"><img src="images/logo.png" alt="Logo"/></Link>    
        <Link to="/profile">Profile</Link> 
        <Link to="/borrow">Borrow</Link>  
        <Link to="/lend">Lend</Link>  
        <Link to="/messages">Messages</Link>   
        <Link to="/about">About Neighbourly</Link>    
        <Link to="/help">Help</Link>    
        <Link onClick={logOutUser}>Logout</Link>
          <span>{user && user.username}</span>
        </>
        )}
        </nav>
    )
}

export default Navbar;