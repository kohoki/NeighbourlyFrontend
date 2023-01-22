import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = "https://calm-lime-cobra-gear.cyclic.app";

function MessageDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState();
  const [message, setMessage] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [borrowMessage] = useState("You can borrow the item !! ;-)");

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    const fetchMessages = async () => {
      let response = await axios.post(`${API_URL}/messages/${user._id}`);
      setMessages(response.data.messagesOfUser);
    };
    fetchMessages();
  }, [newMessage]);

  useEffect(() => {
    if (messages) {
      // console.log("AA", messages);
      messages.map((element) => {
        if (element._id === id) {
          setMessage(element);
          console.log("BB:", message);
        }
      });
    }
  }, [messages]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const newSend = { message: newMessage, userId: user._id };
      await axios.post(`${API_URL}/messages/${id}/update`, newSend);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleYouCan = async (event) => {
    try {
      event.preventDefault();
      const newSend = { message: borrowMessage, userId: user._id };
      await axios.post(`${API_URL}/messages/${id}/update`, newSend);
      const bodyForItem = { id: message.borrower._id };
      await axios.put(
        `${API_URL}/item/${message.item._id}/status`,
        bodyForItem
      );
      refreshPage();
    } catch (error) {
      console.log(error);
    }
  };

  return message ? (
    <div className="backgroundColor2">
      <div>
        <h1 style={{ padding: "10px" }} className="textColor">
          Message Detail:{" "}
        </h1>
      </div>
      <div
        className="container"
        style={{
          display: "flex",
          margin: "0px",
          flexDirection: "column ",
          justifyContent: "space-around",
        }}
      >
        {message.communication.map((element) => {
          return (
            <div style={{ margin: "10px" }} key={element._id} class="card w-25">
              <div className="card-body">
                <h5 className="card-title">{element.userId.username} wrote:</h5>
                <p
                  style={{ color: "black", textAlign: "left" }}
                  className="card-text"
                >
                  {element.message}
                </p>
              </div>
            </div>
          );
        })}
        <form onSubmit={handleSubmit}>
          <div style={{ margin: "10px", width: "30rem" }}>
            <textarea
              style={{ marginTop: "30px" }}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              type="text"
              placeholder="Your message"
              value={newMessage}
              onChange={(event) => setNewMessage(event.target.value)}
            />
          </div>
          <div style={{ margin: "10px" }}>
            <button className="btn btn-light" type="submit">
              send
            </button>
          </div>
        </form>
        {/* {console.log("AA:", user.username)} */}
        {(() => {
          if (
            (user.username === message.lender.username) &
            !message.item.borrowed
          ) {
            return (
              <div style={{ margin: "10px" }}>
                <form onSubmit={handleYouCan}>
                  <button className="btn btn-warning" type="submit">
                    you can borrow it
                  </button>
                </form>
              </div>
            );
          }
        })()}
      </div>
    </div>
  ) : (
    <div class="spinner-border text-light" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  );
}

export default MessageDetail;
