import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function Edit (props) {
    const {user} = useContext(AuthContext)

  

    const [username, setUsername] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [image, setImage] = useState();
    const [password, setPassword] = useState();
    const [aboutMe, setAboutMe] = useState();

    useEffect(() => {
        const fetchUser = async () => {
            let response = await axios.get(`${API_URL}/profile/${user._id}`)
            let userObj = response.data.user 
            setUsername(userObj.username)   
            setFirstName(userObj.firstName)     
            setLastName(userObj.lastName)
            setEmail(userObj.email)
            setImage()
            setPassword(userObj.password)
            setAboutMe(userObj.aboutMe)

        }
        fetchUser();
    }, [] )
   
    const navigate = useNavigate();

    const handleUsername = (e) => setUsername(e.target.value);
    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handleImage = (e) => setImage(e.target.value);
    const handleAboutMe = (e) => setAboutMe(e.target.value);
    const [errorMessage, setErrorMessage] = useState(undefined);

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        
        const requestBody = { username, firstName, lastName, email, userImage: image, aboutMe};

        axios.put(`${API_URL}/profile/${user._id}`, requestBody)
          .then((response) => {
            navigate(`/profile/${user._id}`);
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
          })
    };

    

    return (
        <div>
            <h1>Update your Profile Details</h1>
            <form onSubmit={handleCreateSubmit}>
        <label>Username: </label>
          <input 
            type="text"
            name="username"
            value={username}
            onChange={handleUsername}
          />
   
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

          <label>Update your Profile Image: </label>
          <input 
            type="file"
            name="image"
            value={image}
            onChange={handleImage}
          />

        <label>Email:</label>
          <input 
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />

        <label>About Me:</label>
          <input 
            type="text"
            name="aboutMe"
            value={aboutMe}
            onChange={handleAboutMe}
          />
          
          <button type="submit">Update</button>
        </form>

        { errorMessage && <p className="error-message">{errorMessage}</p> }
        </div>
    )
}

export default Edit;