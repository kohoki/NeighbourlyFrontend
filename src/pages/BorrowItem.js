import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";


function BorrowItem (props) {
    const [lender, setLender] = useState();
    const [item, setItem] = useState();
    const itemId = useParams()


    const fetchItemAndLender = async () => {
        let response = await axios.get(`${API_URL}/item/borrow/${itemId.itemId}`)
        setItem(response.data.item);
        console.log(response.data.item)
        //console.log(response.data.foundedItems);
        setLender(response.data.item.creator);
        //console.log('Lender: ', lender);
    }

    useEffect(() => {
        fetchItemAndLender();
    }, []);

    console.log('Lender: ', lender);
    


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
                <input />
            </div>
        </>
    ) : (
        <h1>Loading...</h1>
    )
}

export default BorrowItem;