import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const API_URL = "http://localhost:5005"

function LentItems () {
    const { user } = useContext(AuthContext);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            let response = await axios.get(`${API_URL}/item/${user._id}`)
            setItems(response.data.foundedItems)
        }
        fetchItems();
    }, []);

    return items? (
        <div>
            <h1>These items can be lent: </h1>
            {items.map(item => (
                <div key={item._id}>
                <p>Item name: {item.itemName}</p>
                <p>Image: <img src={item.image} alt="item-pic"/></p>
                <p>Description: {item.description}</p>
                <p>Availability: {item.availability}</p>
                </div>
            ))}
        </div>
    ) 
    : (
        <h1>Loading...</h1>
    )
}

export default LentItems;