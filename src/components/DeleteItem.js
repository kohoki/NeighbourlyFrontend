import axios from "axios";

const API_URL = "http://localhost:5005";

function DeleteItem({itemId, setItems, userId}) {
const handleDelete = () => {
const deleteItem = async() => {
await axios.delete(`${API_URL}/address/${userId}/delete/${addressId}`)
}
deleteItem()
const fetchItems = async () => {
    let response = await axios.get(`${API_URL}/item/${userId}`)
    setItems(response.data.foundedItems)
}
fetchItems();
} 

return (
<>
<button type="submit" onClick={handleDelete}>Remove Item</button>
</>
    )
}

export default DeleteItem;