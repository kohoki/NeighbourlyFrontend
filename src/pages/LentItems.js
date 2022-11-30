import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import DeleteItem from "../components/DeleteItem";
import EditItem from "../components/EditItem";
import EditItemImage from "../components/EditItemImage";

const API_URL = "http://localhost:5005"

function LentItems () {
    const { user } = useContext(AuthContext);
    const [items, setItems] = useState();

    useEffect(() => {
        const fetchItems = async () => {
            let response = await axios.get(`${API_URL}/item/${user._id}`)
            setItems(response.data.foundedItems)
        }
        fetchItems();
    }, []);

    return items? (
        <div>
            <h1>Your Loaned Items: </h1>
            {items.map(item => (
                <div key={item._id}>
                <p>Item name: {item.itemName}</p>
                <img src={item.image} alt="item-pic"/>
                <p>Description: {item.description}</p>
                <p>Availability: {item.availability}</p>
                <EditItem userId={user._id} itemId={item._id}/>
                <EditItemImage itemId={item._id}/>
                <DeleteItem userId={user._id} itemId={item._id} setItems={setItems}/>
                </div>
            ))}
            <Link className="Link" to="/lend">Loan Another Item</Link>
        </div>
    ) 
    : (
        <h1>Loading...</h1>
    )
}

export default LentItems;