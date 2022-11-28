import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";


function BorrowItem (props) {
    const [lender, setLender] = useState();
    const [item, setItem] = useState();
    const [message, setMessage] = useState();
    const itemId = useParams()
    const [errorMessage, setErrorMessage] = useState(undefined);
    const {user} = useContext(AuthContext)
    const navigate = useNavigate();


    const fetchItemAndLender = async () => {
        let response = await axios.get(`${API_URL}/item/borrow/${itemId.itemId}`)
        setItem(response.data.item);
        setLender(response.data.item.creator);
    }

    useEffect(() => {
        fetchItemAndLender();
    }, []);

    const handleMessage = (e) => setMessage(e.target.value);

    const handleMessageSubmit = async (e) => {
        try {
            e.preventDefault();
            const requestBody = {item: itemId.itemId, lender: lender._id, borrower: user._id, communication: [{message: message, userId: user._id}]};
            console.log(requestBody)

            const postMessage = await axios.post(`${API_URL}/messages/create`, requestBody);
            navigate(`/profile/${user._id}`);
        } catch (error) {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
        }
    }
    


    return item && lender? (
        <>
            <h1>Want to borrow this item?</h1>
            <div className="borrowItem">
                <p>Item name: {item.itemName}</p>
                <p>Image: <img src={item.image} alt="item-pic"/></p>
                <p>Description: {item.description}</p>
                <p>Availability: {item.availability}</p>
                <p>Creator: {lender.username}</p>
            </div>  
            <div className="lenderProfile">
                <p>Username: {lender.username}</p>
                <p>Image: <img src={lender.userImage} alt="item-pic"/></p>
            </div>
            <div className="messages">
                <h2>Get in touch with the lender: </h2>
                <form onSubmit={handleMessageSubmit}>
                    <label> Write a message to the lender: </label>
                      <input type="text" name="message" value={message} onChange={handleMessage}/>
                      <button type="submit">Submit message</button> 
                </form>

                { errorMessage && <p className="error-message">{errorMessage}</p> }
            </div>
        </>
    ) : (
        <h1>Loading...</h1>
    )
}

export default BorrowItem;