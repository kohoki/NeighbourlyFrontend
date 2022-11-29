import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function EditAddressForm () {
const {addressId, userId} = useParams()
console.log(addressId, "HELLO")

const [name, setName] = useState();
const [number, setNumber] = useState();
const [street, setStreet] = useState();
const [postalCode, setPostalCode] = useState();
const [city, setCity] = useState();

    useEffect(() => {
        const fetchAddress = async () => {
            let response = await axios.get(`${API_URL}/address/${addressId}/edit`)
           const addressObj = response.data;
            setName(addressObj.nameOfAddress)   
            setNumber(addressObj.number)     
            setStreet(addressObj.street)
            setPostalCode(addressObj.postalCode)
            setCity(addressObj.city)
        }
        fetchAddress();
    }, [] ) 
   
   const navigate = useNavigate();

    const handleName = (e) => setName(e.target.value);
    const handleNumber = (e) => setNumber(e.target.value);
    const handleStreet = (e) => setStreet(e.target.value);
    const handlePostalCode = (e) => setPostalCode(e.target.value);
    const handleCity = (e) => setCity(e.target.value);
    const [errorMessage, setErrorMessage] = useState(undefined);

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        
        const requestBody = { nameOfAddress: name, number, street, postalCode, city};

        axios.put(`${API_URL}/address/${addressId}/edit`, requestBody)
          .then((response) => {
            navigate(`/profile/${userId}/address`);
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
          }) 
    };

    return (
        <div>
            <h1>Update Address Details</h1>
            <form onSubmit={handleCreateSubmit}>
            <label>Address Title: </label>
          <input 
            type="text"
            name="name"
            value={name}
            onChange={handleName}
          />
   
          <label>Street Number: </label>
          <input 
            type="text"
            name="number"
            value={number}
            onChange={handleNumber}
          />

          <label>Street Name: </label>
          <input 
            type="text"
            name="street"
            value={street}
            onChange={handleStreet}
          />

        <label>Post Code: </label>
          <input 
            type="text"
            name="postcode"
            value={postalCode}
            onChange={handlePostalCode}
          />

        <label>City: </label>
          <input 
            type="text"
            name="city"
            value={city}
            onChange={handleCity}
          />
          
          <button type="submit">Update</button>
        </form>

        { errorMessage && <p className="error-message">{errorMessage}</p> }
        </div>
    ) 
}


export default EditAddressForm