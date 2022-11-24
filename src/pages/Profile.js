import userEvent from "@testing-library/user-event";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Profile () {
    const {  user } = useContext(AuthContext);
    return (
        <div>
            <h1>Hi there {user.username}</h1>
            <img src="images/userIcon.jpg"/>
            <p>Update Photo</p>
            <h2>Rating ⭐ 4.6</h2>
            <h2>About Me</h2>
            <h3>Name</h3>
            <h3>Location</h3>
            <h3>Bio</h3>
            <div>
                <h2>Items Borrowed</h2>
                <Link to="/borrow">Add Item</Link>
            </div>
            <div>
                <h2>Items Lent</h2>
                <Link to="/lend">Add Item</Link>
            </div>
        </div>
    )
}

export default Profile;