import React from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function MessageDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    const fetchMessages = async () => {
      let response = await axios.post(`${API_URL}/messages/${user._id}`);
      setMessages(response.data.messagesOfUser);
      //   console.log(response.data.messagesOfUser);
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    if (messages) {
      console.log("AA", messages);
      messages.map((element) => {
        if (element._id === id) {
          setMessage(element);
          console.log("BB:", message);
        }
      });
    }
  }, [messages]);

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
    </div>
  ) : (
    <div>is Loading</div>
  );
}

export default MessageDetail;
