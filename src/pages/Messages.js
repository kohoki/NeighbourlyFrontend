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
    <div
      className="backgroundColor"
      style={{ display: "flex", flexDirection: "column " }}
    >
      <div>
        <h1 style={{ margin: "20px" }} className="textColor">
          Your Messages{" "}
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
        <div>
          {messages.map((message) => (
            <div>
              <ul>
                {/* {console.log(message._id)} */}
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/messages/details/${message._id}`}
                >
                  <li className="card w-50" key={message._id}>
                    <div class="card-body">
                      <h5 class="card-title">
                        <img
                          style={{ width: "40px" }}
                          src={message.item.image}
                          className="card-img-top"
                          alt="..."
                        />
                        {message.item.itemName}
                      </h5>

                      <p class="card-title">
                        Lender of item: {message.lender.username}
                      </p>
                      <p class="card-title">
                        person might borrow some: {message.borrower.username}
                      </p>
                    </div>
                  </li>
                </Link>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div class="spinner-border text-light" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
  );
}

export default Messages;
