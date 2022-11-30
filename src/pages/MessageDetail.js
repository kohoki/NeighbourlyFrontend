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
  const [borrowMessage, setBorrowMessage] = useState(
    "You can borrow the item !! ;-)"
  );

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
    <div>
      MessageDetail:
      {message.communication.map((element) => {
        return (
          <p key={element._id}>
            {element.userId.username}: {element.message}
          </p>
        );
      })}
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            type="text"
            placeholder="Your message"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
          />
        </div>

        <button type="submit">send</button>
      </form>
      {/* {console.log("AA:", user.username)} */}
      {(() => {
        if (
          (user.username === message.lender.username) &
          !message.item.borrowed
        ) {
          return (
            <form onSubmit={handleYouCan}>
              <button type="submit">you can borrow it</button>
            </form>
          );
        }
      })()}
    </div>
  ) : (
    <div>is Loading</div>
  );
}

export default MessageDetail;
