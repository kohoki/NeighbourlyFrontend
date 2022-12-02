import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function BorrowItem() {
  const [lender, setLender] = useState();
  const [item, setItem] = useState();
  const [message, setMessage] = useState();
  const itemId = useParams();
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchItemAndLender = async () => {
    let response = await axios.get(`${API_URL}/item/borrow/${itemId.itemId}`);
    setItem(response.data.item);
    setLender(response.data.item.creator);
  };

  useEffect(() => {
    fetchItemAndLender();
  }, []);

  const handleMessage = (e) => setMessage(e.target.value);

  const handleMessageSubmit = async (e) => {
    try {
      e.preventDefault();
      const requestBody = {
        item: itemId.itemId,
        lender: lender._id,
        borrower: user._id,
        communication: [{ message: message, userId: user._id }],
      };
      console.log(requestBody);

      await axios.post(`${API_URL}/messages/create`, requestBody);
      navigate(`/profile/${user._id}`);
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return item && lender ? (
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
          Want to borrow this item?{" "}
        </h1>
      </div>

      <div
        key={item._id}
        className="card"
        style={{
          width: "22rem",
          marginTop: "50px",
        }}
      >
        <img src={item.image} alt="item-pic" className="card-img-top" />
        <div
          className="card-body"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h5 className="card-title">{item.itemName}</h5>
          <p style={{ color: "black" }} className="card-text">
            {item.description}
          </p>
          <p style={{ color: "black" }} className="card-text">
            Availability: {item.availability}
          </p>
          <div
            key={item._id}
            className="card"
            style={{ width: "15rem", marginTop: "20px" }}
          >
            <p style={{ color: "black" }} className="card-text">
              Creator: {lender.username}
            </p>

            <div className="card-body">
              <img
                src={lender.userImage}
                alt="item-pic"
                className="card-img-top"
              />
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <h2 className="display-6">Get in touch with the lender: </h2>
            <form style={{ marginTop: "20px" }} onSubmit={handleMessageSubmit}>
              <label> Write a message to the lender: </label>
              <textarea
                className="form-control"
                type="text"
                rows="4"
                name="message"
                placeholder="Your message"
                value={message}
                onChange={handleMessage}
              />
              <button
                style={{ marginTop: "20px" }}
                className="btn btn-secondary"
                type="submit"
              >
                Submit message
              </button>
            </form>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  ) : (
    <div class="spinner-border text-light" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  );
}

export default BorrowItem;
