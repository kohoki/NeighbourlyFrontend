import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const API_URL = "https://calm-lime-cobra-gear.cyclic.app";

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
    <div style={{ display: "flex" }}>
      <div>
        {messages.map((message) => (
          <div>
            <ul className="ListItem">
              {console.log(message._id)}
              <Link to={`/messages/details/${message._id}`}>
                <li style={{ borderStyle: "solid" }} key={message._id}>
                  Item:{" "}
                  <img
                    src={message.image_url}
                    className="card-img-top"
                    alt="..."
                  />
                  {message.item.itemName} / Lender of item:{" "}
                  {message.lender.username}
                  <br></br> / person might borrow some:{" "}
                  {message.borrower.username}
                </li>
              </Link>
            </ul>
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

export default Messages;
