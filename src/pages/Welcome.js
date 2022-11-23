import { Link } from "react-router-dom";

function Welcome () {
    return (
        <div>
        <Link className="Link" to="/signup">Register an Account</Link>    
        <Link className="Link" to="/login">Log In to your Account</Link> 
        </div>
    )
}

export default Welcome;