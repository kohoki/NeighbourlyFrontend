import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "https://calm-lime-cobra-gear.cyclic.app";

function Lend() {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleItemName = (e) => setItemName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleAvailability = (e) => setAvailability(e.target.value);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    const requestBody = {
      itemName,
      description,
      availability,
      creator: user._id,
    };
    let response = await axios.post(
      `${API_URL}/item/${user._id}/create`,
      requestBody
    );
    let itemId = response.data.item._id;
    navigate(`/lend/${itemId}/image`);
  };

  return (
    <div className="backgroundColor">
      <h1 className="textColor HomeH2">
        Sharing is caring. What would you like to lend?
      </h1>
      <h2 className="textColor HomeH2">Add your item's details</h2>

      <form onSubmit={handleCreateSubmit}>
        <div className="mb-3" style={{ width: "30vw" }}>
          <label className="textColor">Item name:</label>
          <input
            type="text"
            name="itemName"
            value={itemName}
            onChange={handleItemName}
            className="form-control"
          />
        </div>
        <div className="mb-3" style={{ width: "30vw" }}>
          <label className="textColor">Description:</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleDescription}
            className="form-control"
          />
        </div>
        <div className="mb-3" style={{ width: "30vw" }}>
          <label className="textColor">Availability of item:</label>
          <input
            type="text"
            name="availability"
            value={availability}
            onChange={handleAvailability}
            className="form-control"
          />
        </div>
        <button className="btn btn-light" type="submit">
          Create item for lending
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Lend;
