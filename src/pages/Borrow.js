import { useState, useEffect } from "react";
// import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005";

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
    <div
      className="backgroundColor"
      style={{ display: "flex", flexDirection: "column " }}
    >
      <div>
        <h1 style={{ margin: "10px" }} className="textColor">
          What are you looking for?{" "}
        </h1>
      </div>
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
              <p className="card-text">{item.description}</p>
              <p className="card-text">Availability: {item.availability}</p>
              <p className="card-text">Creator: {item.creator.username}</p>
              <Link className="btn btn-secondary" to={`/borrow/${item._id}`}>
                Contact Lender
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="container backgroundColor">
      <h1>Loading...</h1>
    </div>
  );
}

export default Borrow;
