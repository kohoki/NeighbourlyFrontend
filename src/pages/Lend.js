import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function Lend (props) {
    const [itemName, setItemName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [availability, setAvailability] = useState("");
    const {user} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleItemName = (e) => setItemName(e.target.value);
    const handleImage = (e) => setImage(e.target.value);
    const handleDescription = (e) => setDescription(e.target.value);
    const handleAvailability = (e) => setAvailability(e.target.value);
    const [errorMessage, setErrorMessage] = useState(undefined);

    const handleCreateSubmit = (e) => {
        e.preventDefault();

        // Create an object representing the request body
        
        const requestBody = { itemName, image, description, availability, creator: user};

        // Make an axios request to the API
        // If POST request is successful redirect to home page
        // If the request resolves with an error, set the error message in the state
        axios.post(`${API_URL}/item/${user._id}`, requestBody)
          .then((response) => {
            navigate(`/profile/lentItems/${user._id}`);
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
          })
    };


    return (
        <div className="LendPage">
            <h1>Sharing is caring. What would you like to lend?</h1>
            <form onSubmit={handleCreateSubmit}>
        <label>Item name:</label>
          <input 
            type="text"
            name="itemName"
            value={itemName}
            onChange={handleItemName}
          />

          <label>Select an image:</label>
          <input 
            type="file"
            name="image"
            value={image}
            onChange={handleImage}
          />
   
          <label>Description:</label>
          <input 
            type="text"
            name="description"
            value={description}
            onChange={handleDescription}
          />

          <label>Availability of item:</label>
          <input 
            type="text"
            name="availability"
            value={availability}
            onChange={handleAvailability}
          />
   
          <button type="submit">Create item for lending</button>
        </form>

        { errorMessage && <p className="error-message">{errorMessage}</p> }
        </div>
    )
}

export default Lend;