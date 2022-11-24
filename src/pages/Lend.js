import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function Lend () {
    const [itemName, setItemName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [availability, setAvailability] = useState("");

    const navigate = useNavigate();

    const handleItemName = (e) => setItemName(e.target.value);
    const handleImage = (e) => setImage(e.target.value);
    const handleDescription = (e) => setDescription(e.target.value);
    const handleAvailability = (e) => setAvailability(e.target.value);

    const handleCreateSubmit = (e) => {};


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
        </div>
    )
}

export default Lend;