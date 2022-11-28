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

      setMessages(response.data.messagesOfUser);
    };
    fetchMessages();
  }, []);

  console.log(messages);
  return messages ? (
    <div>
      TEst
      {messages.map((message) => (
        <div>
          <ul className="ListItem">
            <li style={{ borderStyle: "dotted" }} key={message._id}>
              {message.item.itemName}
            </li>
          </ul>
        </div>
      ))}
    </div>
  ) : (
    <div>is Loading</div>
  );
}

export default Messages;
