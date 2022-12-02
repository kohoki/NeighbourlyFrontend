import axios from "axios";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function BorrowedItems() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState();

  useEffect(() => {
    const fetchItems = async () => {
      let response = await axios.get(`${API_URL}/item/${user._id}/borrowed`);
      setItems(response.data.findItems);
    };
    fetchItems();
  }, []);

  return items ? (
    <div>
      <h1>These items are currently borrowed:</h1>
      {items.map((item) => (
        <div key={item._id}>
          <p>Item name: {item.itemName}</p>
          <p>
            Image: <img src={item.image} alt="item-pic" />
          </p>
          <p>Description: {item.description}</p>
          <p>Availability: {item.availability}</p>
        </div>
      ))}
      <Link className="Link" to="/borrow">
        Borrow Another Item
      </Link>
    </div>
  ) : (
    <div class="spinner-border text-light" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  );
}

export default BorrowedItems;
