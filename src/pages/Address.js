import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import EditAddress from "../components/EditAddress";
import DeleteAddress from "../components/DeleteAddress";

const API_URL = "http://localhost:5005";

function Address () {
    const {user} = useContext(AuthContext)
    const {userId} = useParams()
    const [addresses, setAddresses] = useState()
    const [name, setName] = useState("");
    const [number, setNumber] = useState();
    const [street, setStreet] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");

    useEffect(() => {
        const fetchAddress = async () => {
            let response = await axios.get(`${API_URL}/address/${userId}`)
           setAddresses(response.data.addresses)
       
        }
        fetchAddress();
    }, [])

    const handleName = (e) => setName(e.target.value);
    const handleNumber = (e) => setNumber(e.target.value);
    const handleStreet = (e) => setStreet(e.target.value);
    const handlePostalCode = (e) => setPostalCode(e.target.value);
    const handleCity = (e) => setCity(e.target.value);
    const [errorMessage, setErrorMessage] = useState(undefined);

    const handleCreateSubmit = (e) => {
        e.preventDefault();

    const requestBody = { nameOfAddress: name, number, street, postalCode, city, creator: user};

    axios.post(`${API_URL}/address/${userId}/create`, requestBody)
    .then((response) => {
        console.log(response)
    setAddresses([response.data.newAddress,...addresses])
    setName("");
    setNumber("");
    setStreet("");
    setPostalCode("");
    setCity("");
    })
    .catch((error) => {
    const errorDescription = error.response.data.message;
    setErrorMessage(errorDescription);
    })


    };


    return addresses? (
        <div>
            <h1>Address Info</h1>
            <h2>Add an Address</h2>
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
   
          <button type="submit">Add</button>
        </form>

        { errorMessage && <p className="error-message">{errorMessage}</p> }
        <div>
            <h2>Current Addresses</h2>

{addresses.map((address) =>
<div key={address._id}>
<ul>
<li className="ListItem">{address.nameOfAddress}</li>
<li className="ListItem">{address.number} {address.street}</li>
<li className="ListItem">{address.postalCode}</li>
<li className="ListItem">{address.city}</li>
</ul>
<EditAddress addressId={address._id} userId={userId} setAddresses={setAddresses}/>
<DeleteAddress addressId={address._id} userId={userId} setAddresses={setAddresses}/>
</div>
)}

</div>
</div>)
    : (
        <h1>Loading...</h1>
    )
}

export default Address;