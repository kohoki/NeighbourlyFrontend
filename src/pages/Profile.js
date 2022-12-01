import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const API_URL = "http://localhost:5005";

function Profile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState();
  const [address, setAddress] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      let response = await axios.get(`${API_URL}/profile/${user._id}`);
      setProfile(response.data.user);
      setAddress(response.data.user.addresses[0]);
    };
    fetchUser();
  }, []);

  return profile ? (
    <div className="backgroundColor textColor">
      <div className="profile-header">
       <h1>Hi {profile.username}! Have a look on your profile!</h1> 
      </div>
        <div className="profile">
          <div className="left-side">
            <div className="card" style={{width: "30rem", height: "50rem"}}>
              <img className="card-img-top" src={profile.userImage} alt="profile-pic"/>
              <div className="card-body">
                <h3 className="card-subtitle mb-2 text-muted">
                  {profile.firstName} {profile.lastName}
                </h3>
                <p className="card-text" style={{color: "black"}}>{profile.aboutMe}</p>
                <Link className="btn btn-secondary" to={`/profile/${user._id}/edit`}>
                Update Profile
                  <img
                  className="Icon"
                  src="https://res.cloudinary.com/dv6mgmdzd/image/upload/v1669731236/Project%203%20-%20Neighbourly/pen_si0ity.png"
                  alt="pen"
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className="right-side" style={{height: "50rem"}}>  
             <div className="card" style={{width: "30rem", height: "20rem"}}>
              <div className="card-body">
                <h2 className="card-title">Addresses</h2>
                {address ? (
                <>
                <h3 className="card-subtitle mb-2 text-muted">Main Address: </h3>
                <ul>
                  <li className="ListItem card-text" style={{color: "black"}}>{address.nameOfAddress}</li>
                  <li className="ListItem card-text" style={{color: "black"}}>
                  {address.number} {address.street}
                  </li>
                  <li className="ListItem card-text" style={{color: "black"}}>{address.postalCode}</li>
                  <li className="ListItem card-text" style={{color: "black"}}>{address.city}</li>
                </ul>
                </>
              ) : (
              <></>
              )}

                <Link className="btn btn-secondary" to={`/profile/${user._id}/address`}>Update Addresses</Link>
              </div>
            </div>   
            <div className="card" style={{width: "30rem", height: "12rem"}}>
              <div className="card-body">
                <h2 className="card-subtitle mb-2 text-muted">Items Borrowed</h2>
                <Link className="btn btn-secondary" to="/borrow">
                Look for Something to Borrow
                </Link>
                <Link className="btn btn-secondary" to={`/profile/borrowedItems/${user._id}`}>
                All Currently Borrowed Items
                </Link>
              </div>
            </div>
            <div className="card" style={{width: "30rem", height: "10rem"}}>
              <div className="card-body">
                <h2 className="card-subtitle mb-2 text-muted">Items Loaned</h2>
                <Link className="btn btn-secondary" to="/lend">
                Lend a New Item
                </Link>
                <Link className="btn btn-secondary" to={`/profile/lentItems/${user._id}`}>
                All Loaned Items
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  ) : (
    <h1>Loading...</h1>
  );
}

export default Profile;
