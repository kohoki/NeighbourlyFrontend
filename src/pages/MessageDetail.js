import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function MessageDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState();
  const [message, setMessage] = useState();
  const [newMessage, setNewMessage] = useState("");

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
          // console.log("BB:", message);
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

  return message ? (
    <div>
      MessageDetail:
      {message.communication.map((element) => {
        return (
          <p>
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
    </div>
  ) : (
    <div>is Loading</div>
  );
}

export default MessageDetail;
