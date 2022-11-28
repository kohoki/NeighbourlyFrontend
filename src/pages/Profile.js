import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const API_URL = "http://localhost:5005"

function Profile () {
const { user } = useContext(AuthContext);
const [ profile, setProfile ] = useState()
const [address, setAddress] = useState()

useEffect(() => {
    const fetchUser = async () => {
        let response = await axios.get(`${API_URL}/profile/${user._id}`)
        setProfile(response.data.user)
        setAddress(response.data.user.addresses[0])
        
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
            <p>{profile.aboutMe}</p>

            <div>
            <h2>Addresses</h2>
            <h3>Main Address: </h3>
            <div>
            <ul>
        <li className="ListItem">{address.nameOfAddress}</li>
        <li className="ListItem">{address.number} {address.street}</li>
        <li className="ListItem">{address.postalCode}</li>
        <li className="ListItem">{address.city}</li>
            </ul>
            </div>
            <Link className="Link" to={`/profile/${user._id}/address`}>Update Addresses</Link>
            </div>
           
            <div>
                <h2>Items Borrowed</h2>
                <Link className="Link" to="/borrow">Look for Something to Borrow</Link>
            </div>
            <div>
                <h2>Items Loaned</h2>
                <Link className="Link" to="/lend">Lend a New Item</Link>
                <Link className="Link" to={`/profile/lentItems/${user._id}`}>All Loaned Items</Link>
                
            </div>
        </div>
    ) 
    : (
        <h1>Loading...</h1>
    )
}

export default Profile;