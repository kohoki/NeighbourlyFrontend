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
    <div className="backgroundColor2 textColor">
      <div className="profile-header">
        <h1>Hi {profile.username}! Take a look at your profile!</h1>
      </div>
      <div className="profile">
        <div className="left-side">
          <div
            className="card"
            style={{
              width: "30rem",
              height: "50rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              textAlign: "center",
            }}
          >
            <img
              className="card-img-top"
              src={profile.userImage}
              alt="profile-pic"
            />
            <div className="card-body">
              <h3 className="card-subtitle mb-2 text-muted">
                {profile.firstName} {profile.lastName}
              </h3>
              <p className="card-text" style={{ color: "black" }}>
                {profile.aboutMe}
              </p>
              <Link
                className="btn btn-secondary"
                to={`/profile/${user._id}/edit`}
              >
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

        <div className="right-side" style={{ height: "50rem" }}>
          <div className="card" style={{ width: "30rem", height: "20rem" }}>
            <div className="card-body">
              <div className="address-main">
                <h2 className="card-title" style={{ color: "black" }}>
                  Addresses
                </h2>
                {address ? (
                  <>
                    <h3 className="card-subtitle mb-2 text-muted">
                      Main Address:{" "}
                    </h3>
                    <ul style={{ padding: "0" }}>
                      <li
                        className="ListItem card-text"
                        style={{ color: "black", fontSize: "1.3rem" }}
                      >
                        {address.nameOfAddress}
                      </li>
                      <li
                        className="ListItem card-text"
                        style={{ color: "black", fontSize: "1.3rem" }}
                      >
                        {address.number} {address.street}
                      </li>
                      <li
                        className="ListItem card-text"
                        style={{ color: "black", fontSize: "1.3rem" }}
                      >
                        {address.postalCode}
                      </li>
                      <li
                        className="ListItem card-text"
                        style={{ color: "black", fontSize: "1.3rem" }}
                      >
                        {address.city}
                      </li>
                    </ul>
                  </>
                ) : (
                  <></>
                )}

                <Link
                  className="btn btn-secondary"
                  to={`/profile/${user._id}/address`}
                >
                  Update Addresses
                </Link>
              </div>
            </div>
          </div>
          <div className="card" style={{ width: "30rem", height: "12rem" }}>
            <div className="card-body">
              <h2 className="card-subtitle mb-2 text-muted">Items Borrowed</h2>
              <div className="link-box-profile">
                <Link className="btn btn-secondary" to="/borrow">
                  Look for Something to Borrow
                </Link>
                <Link
                  className="btn btn-secondary"
                  to={`/profile/borrowedItems/${user._id}`}
                >
                  All Currently Borrowed Items
                </Link>
              </div>
            </div>
          </div>
          <div className="card" style={{ width: "30rem", height: "12rem" }}>
            <div className="card-body">
              <h2 className="card-subtitle mb-2 text-muted">Items Loaned</h2>
              <div className="link-box-profile">
                <Link className="btn btn-secondary" to="/lend">
                  Lend a New Item
                </Link>
                <Link
                  className="btn btn-secondary"
                  to={`/profile/lentItems/${user._id}`}
                >
                  All Loaned Items
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div class="spinner-border text-light" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  );
}

export default Profile;
