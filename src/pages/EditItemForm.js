import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function EditItemForm () {
const {itemId, userId} = useParams()

const [itemName, setItemName] = useState("");
const [description, setDescription] = useState("");
const [availability, setAvailability] = useState("");

    useEffect(() => {
        const fetchAddress = async () => {
            let response = await axios.get(`${API_URL}/item/borrow/${itemId}`)
           const itemObj = response.data.item;
          setItemName(itemObj.itemName)      
          setDescription(itemObj.description)
          setAvailability(itemObj.availability)
        }
        fetchAddress();
    }, [] ) 
   
   const navigate = useNavigate();

    const handleItemName = (e) => setItemName(e.target.value);
    const handleDescription = (e) => setDescription(e.target.value);
    const handleAvailability = (e) => setAvailability(e.target.value);
    const [errorMessage, setErrorMessage] = useState(undefined);

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        
        const requestBody = { itemName, description, availability};

        axios.put(`${API_URL}/item/${itemId}/edit`, requestBody)
          .then(() => {
            navigate(`/profile/lentItems/${userId}`);
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
          }) 
    }; 

    return (
        
        <div>
            <h1>Update Item Details</h1>
            <form onSubmit={handleCreateSubmit}>
            <label>Item name:</label>
          <input 
            type="text"
            name="itemName"
            value={itemName}
            onChange={handleItemName}
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
          
          <button type="submit">Update</button>
        </form>

        { errorMessage && <p className="error-message">{errorMessage}</p> }
        </div>
    ) 
}


export default EditItemForm