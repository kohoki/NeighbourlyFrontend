import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "https://calm-lime-cobra-gear.cyclic.app";

function Edit() {
  const { user } = useContext(AuthContext);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  // const [password, setPassword] = useState();
  const [aboutMe, setAboutMe] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      let response = await axios.get(`${API_URL}/profile/${user._id}`);
      let userObj = response.data.user;
      setFirstName(userObj.firstName);
      setLastName(userObj.lastName);
      setEmail(userObj.email);
      // setPassword(userObj.password);
      setAboutMe(userObj.aboutMe);
    };
    fetchUser();
  }, []);

  const navigate = useNavigate();

  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleAboutMe = (e) => setAboutMe(e.target.value);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleCreateSubmit = (e) => {
    e.preventDefault();

    const requestBody = { firstName, lastName, email, aboutMe };

    axios
      .put(`${API_URL}/profile/${user._id}`, requestBody)
      .then(() => {
        navigate(`/profile/${user._id}`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const image = event.target.imageUrl.files[0];
    const formData = new FormData();
    formData.append("imageUrl", image);
    await axios.post(`${API_URL}/api/${user._id}/upload`, formData);
    navigate(`/profile/${user._id}`);
  };

  return (
    <div>
      <h1>Update your Profile Details</h1>
      <h2>User Image</h2>
      <form onSubmit={handleUpload}>
        <input type="file" name="imageUrl" accept="image/png, image/jpg" />
        <button type="submit">Upload</button>
      </form>
      <h2>User Details</h2>
      <form onSubmit={handleCreateSubmit}>
        <label>First Name:</label>
        <input
          type="text"
          name="firstname"
          value={firstName}
          onChange={handleFirstName}
        />

        <label>Last Name:</label>
        <input
          type="text"
          name="lastname"
          value={lastName}
          onChange={handleLastName}
        />

        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>About Me:</label>
        <input
          type="text"
          name="aboutMe"
          value={aboutMe}
          onChange={handleAboutMe}
        />

        <button type="submit">Update</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Edit;
