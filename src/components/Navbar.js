import { Link } from "react-router-dom";

function Navbar() {

    return (
        <nav className="Navbar">
        <Link to="/home"><img src="images/logo.png" alt="Logo"/></Link>    
        <Link to="/profile">Profile</Link> 
        <Link to="/borrow">Borrow</Link>  
        <Link to="/lend">Lend</Link>  
        <Link to="/messages">Messages</Link>   
        <Link to="/about">About Neighbourly</Link>    
        <Link to="/help">Help</Link>    
        <Link to="/logout">Logout</Link>    
        </nav>
    )
}

export default Navbar;