import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import DeleteItem from "../components/DeleteItem";
import EditItem from "../components/EditItem";
import EditItemImage from "../components/EditItemImage";
import ChangeItemStatus from "../components/ChangeItemStatus";

const API_URL = "https://calm-lime-cobra-gear.cyclic.app";

function LentItems() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState();

  useEffect(() => {
    const fetchItems = async () => {
      let response = await axios.get(`${API_URL}/item/${user._id}`);
      setItems(response.data.foundedItems);
    };
    fetchItems();
  }, []);

  return items ? (
    <div
      style={{
        backgroundColor: "#172153",
        width: "null",
        height: "null",
        padding: "50px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>
        <h1 style={{ margin: "10px" }} className="textColor">
          Your Loaned Items:{" "}
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

              <p style={{ color: "black" }} className="card-text">
                {item.description}
              </p>
              <p style={{ color: "black" }} className="card-text">
                Availability: {item.availability}
              </p>
              <p style={{ color: "black" }} className="card-text">
                Item is borrowed:{" "}
                {item.borrowed ? <span>yes</span> : <span>no</span>}
              </p>
              {(() => {
                if (item.borrowed) {
                  return (
                    <ChangeItemStatus
                      itemId={item._id}
                      borrower={item.borrower[0]}
                    />
                  );
                }
              })()}

              <EditItem userId={user._id} itemId={item._id} />
              <EditItemImage itemId={item._id} />
              <DeleteItem
                userId={user._id}
                itemId={item._id}
                setItems={setItems}
              />
            </div>
          </div>
        ))}
        <div className="card" style={{ width: "22rem", marginTop: "50px" }}>
          <div className="card-body">
            <Link className="btn btn-secondary" to="/lend">
              Loan Another Item
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div class="spinner-border text-light" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  );
}

export default LentItems;
