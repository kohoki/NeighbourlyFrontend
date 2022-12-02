import { useState, useEffect } from "react";
// import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "https://calm-lime-cobra-gear.cyclic.app";

function Borrow() {
  //   const { user } = useContext(AuthContext);
  const [items, setItems] = useState();

  useEffect(() => {
    const fetchItems = async () => {
      let response = await axios.get(`${API_URL}/item`);
      setItems(response.data.foundedItems);
    };
    fetchItems();
  }, []);

  console.log(items);

  return items ? (
    <div>
      <h1>What are you looking for? </h1>
      {items.map((item) => (
        <div key={item._id} className="itemsToBorrow">
          <p>Item name: {item.itemName}</p>
          <img src={item.image} alt="item-pic" />
          <p>Description: {item.description}</p>
          <p>Availability: {item.availability}</p>
          <p>Creator: {item.creator.username}</p>
          <Link to={`/borrow/${item._id}`}>Contact Lender</Link>
        </div>
      ))}
    </div>
  ) : (
    <div class="spinner-border text-light" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
  );
}

export default Borrow;
