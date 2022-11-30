import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function Lend (props) {
    const [itemName, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [availability, setAvailability] = useState("");
    const {user} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleItemName = (e) => setItemName(e.target.value);
    const handleDescription = (e) => setDescription(e.target.value);
    const handleAvailability = (e) => setAvailability(e.target.value);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleCreateSubmit = async (event) => {
        event.preventDefault();
      const image = event.target.imageUrl.files[0];
      console.log("HI", image)
      const formData = new FormData();
      formData.append("imageUrl", image);
      formData.append("itemName", itemName);
      formData.append("description", description);
      formData.append("availability", availability);
      formData.append("creator", user._id);
      console.log("form data is ", formData, itemName, description, availability, user)
      const response = await fetch(`${API_URL}/item/test`, {
        method: "POST",
        body: formData
      })
      const parsed = await response.json()
      console.log("yo", parsed)
      navigate(`/profile/lentItems/${user._id}`);
    };

    return (
        <div className="LendPage">
            <h1>Sharing is caring. What would you like to lend?</h1>
            <h2>Add your item's details</h2>

        <form onSubmit={handleCreateSubmit}>
        <label>Item name:</label>
          <input 
            type="text"
            name="itemName"
            value={itemName}
            onChange={handleItemName}
          />

          <label>Item image:</label>
          <input 
            type="file" 
            name="imageUrl" 
            accept="image/png, image/jpg"
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