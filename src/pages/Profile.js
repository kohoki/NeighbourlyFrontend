import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const API_URL = "https://calm-lime-cobra-gear.cyclic.app";

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
    <div>
      <h1>Hi there {profile.username}</h1>
      <Link to={`/profile/${user._id}/edit`}>
        Update Profile
        <img
          className="Icon"
          src="https://res.cloudinary.com/dv6mgmdzd/image/upload/v1669731236/Project%203%20-%20Neighbourly/pen_si0ity.png"
          alt="pen"
        />
      </Link>
      <img className="Image" src={profile.userImage} />
      <h2>About Me</h2>
      <h3>
        {profile.firstName} {profile.lastName}
      </h3>
      <p>{profile.aboutMe}</p>

      <div>
        <h2>Addresses</h2>
        {address ? (
          <>
            <h3>Main Address: </h3>
            <ul>
              <li className="ListItem">{address.nameOfAddress}</li>
              <li className="ListItem">
                {address.number} {address.street}
              </li>
              <li className="ListItem">{address.postalCode}</li>
              <li className="ListItem">{address.city}</li>
            </ul>
          </>
        ) : (
          <></>
        )}

        <Link to={`/profile/${user._id}/address`}>Update Addresses</Link>
      </div>

      <div>
        <h2>Items Borrowed</h2>
        <Link className="Link" to="/borrow">
          Look for Something to Borrow
        </Link>
        <Link className="Link" to={`/profile/borrowedItems/${user._id}`}>
          All Currently Borrowed Items
        </Link>
      </div>
      <div>
        <h2>Items Loaned</h2>
        <Link className="Link" to="/lend">
          Lend a New Item
        </Link>
        <Link className="Link" to={`/profile/lentItems/${user._id}`}>
          All Loaned Items
        </Link>
      </div>
    </div>
  ) : (
    <div class="spinner-border text-light" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
  );
}

export default Profile;
