import axios from "axios";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = "https://calm-lime-cobra-gear.cyclic.app";

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
    <div
      className="backgroundColor"
      style={{ display: "flex", flexDirection: "column " }}
    >
      <div>
        <h1 style={{ margin: "10px" }} className="textColor">
          These items are currently borrowed:
        </h1>
      </div>
      {/* <div>
        <Link className="btn btn-light" to="/borrow">
          Borrow Another Item
        </Link>
      </div> */}
      <div
        className="container"
        style={{
          display: "flex",
          margin: "0px",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {items.map((item) => (
          <div
            key={item._id}
            className="card"
            style={{ width: "22rem", marginTop: "50px" }}
          >
            <img src={item.image} alt="item-pic" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{item.itemName}</h5>
              <p style={{ color: "black" }} className="card-text">
                {item.description}
              </p>
              <p style={{ color: "black" }} className="card-text">
                Availability: {item.availability}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div class="spinner-border text-light" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  );
}

export default BorrowedItems;
