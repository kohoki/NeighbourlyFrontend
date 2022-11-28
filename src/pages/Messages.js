import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const API_URL = "http://localhost:5005";

function Messages() {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState();

  useEffect(() => {
    const fetchMessages = async () => {
      let response = await axios.post(`${API_URL}/messages/${user._id}`);
      setMessages(response.data.messages);
    };
    fetchMessages();
  }, []);

  return (
    <div>
      {messages.map((message) => (
        <div>
          <ul className="ListItem">
            <li key={message._id}>{message.borrower}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Messages;
