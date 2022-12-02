import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import EditAddress from "../components/EditAddress";
import DeleteAddress from "../components/DeleteAddress";

const API_URL = "https://calm-lime-cobra-gear.cyclic.app";

function Address() {
  const { user } = useContext(AuthContext);
  const { userId } = useParams();
  const [addresses, setAddresses] = useState();
  const [name, setName] = useState("");
  const [number, setNumber] = useState();
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchAddress = async () => {
      let response = await axios.get(`${API_URL}/address/${userId}`);
      setAddresses(response.data.addresses);
    };
    fetchAddress();
  }, []);

  const handleName = (e) => setName(e.target.value);
  const handleNumber = (e) => setNumber(e.target.value);
  const handleStreet = (e) => setStreet(e.target.value);
  const handlePostalCode = (e) => setPostalCode(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleCreateSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      nameOfAddress: name,
      number,
      street,
      postalCode,
      city,
      creator: user,
    };

    axios
      .post(`${API_URL}/address/${userId}/create`, requestBody)
      .then((response) => {
        console.log(response);
        setAddresses([response.data.newAddress, ...addresses]);
        setName("");
        setNumber("");
        setStreet("");
        setPostalCode("");
        setCity("");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return addresses ? (
    <div className="backgroundColor textColor profile-edit">
      <h1>Manage Your Addresses</h1>
      <div className="address-box">
        <div style={{ width: "50rem" }}>
          <form onSubmit={handleCreateSubmit} className="address-form">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Address Title:{" "}
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleName}
                className="form-control"
                id="exampleFormControlInput1"
              />
            </div>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Street Number:{" "}
              </label>
              <input
                type="text"
                name="number"
                value={number}
                onChange={handleNumber}
                className="form-control"
                id="exampleFormControlInput1"
              />
            </div>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Street Name:{" "}
              </label>
              <input
                type="text"
                name="street"
                value={street}
                onChange={handleStreet}
                className="form-control"
                id="exampleFormControlInput1"
              />
            </div>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Post Code:{" "}
              </label>
              <input
                type="text"
                name="postcode"
                value={postalCode}
                onChange={handlePostalCode}
                className="form-control"
                id="exampleFormControlInput1"
              />
            </div>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                City:{" "}
              </label>
              <input
                type="text"
                name="city"
                value={city}
                onChange={handleCity}
                className="form-control"
                id="exampleFormControlInput1"
              />
            </div>
            <button className="btn btn-light" type="submit">
              Add Address
            </button>
          </form>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="address-form">
          <h2>Current Addresses</h2>

          {addresses.map((address) => (
            <div key={address._id} className="current-addresses">
              <ul style={{ padding: "0" }}>
                <li className="ListItem">{address.nameOfAddress}</li>
                <li className="ListItem">
                  {address.number} {address.street}
                </li>
                <li className="ListItem">{address.postalCode}</li>
                <li className="ListItem">{address.city}</li>
              </ul>
              <EditAddress addressId={address._id} userId={userId} />
              <DeleteAddress
                addressId={address._id}
                userId={userId}
                setAddresses={setAddresses}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div class="spinner-border text-light" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  );
}

export default Address;
