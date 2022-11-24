import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const API_URL = "http://localhost:5005"

function Profile () {
const { user } = useContext(AuthContext);
const [ profile, setProfile ] = useState()

useEffect(() => {
    const fetchUser = async () => {
        let response = await axios.get(`${API_URL}/profile/${user._id}`)
        setProfile(response.data.user)
    }
    fetchUser();
}, [])


    return profile ? (
        <div>
            <h1>Hi there {profile.username}</h1> 
            <Link to={`/profile/${user._id}/edit`}>Update Profile<img src="images/pen.png" alt="pen"/></Link> 
            <img src={profile.userImage}/>
            <h2>Rating ⭐ {profile.rating}</h2>
            <h2>About Me</h2>
            <h3>{profile.firstName} {profile.lastName}</h3>
            <h3>Location</h3>
            <h3>{profile.aboutMe}</h3>
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
    : (
        <h1>Loading...</h1>
    )
}

export default Profile;