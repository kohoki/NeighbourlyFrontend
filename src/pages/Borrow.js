import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005"

function Borrow () {
    const { user } = useContext(AuthContext);
    const [items, setItems] = useState();

    useEffect(() => {
        const fetchItems = async () => {
            let response = await axios.get(`${API_URL}/item`)
            setItems(response.data.foundedItems)
        }
        fetchItems();
    }, []);

    console.log(items)

    return items? (
        <div >
            <h1>What are you looking for? </h1>
            {items.map(item => (
                <div key={item._id} className="itemsToBorrow">
                <p>Item name: {item.itemName}</p>
                <p>Image: <img src={item.image} alt="item-pic"/></p>
                <p>Description: {item.description}</p>
                <p>Availability: {item.availability}</p>
                <p>Creator: {item.creator.username}</p>
                <Link to={`/borrow/${item._id}`}>Contact Lender</Link>
                </div>
            ))}
        </div>
    ) 
    : (
        <h1>Loading...</h1>
    )
}

export default Borrow;