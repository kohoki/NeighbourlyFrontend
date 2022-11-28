import axios from "axios";

const API_URL = "http://localhost:5005";

function DeleteItem({itemId, setItems, userId}) {
const handleDelete = async() => {
await axios.delete(`${API_URL}/item/${userId}/delete/${itemId}`)
let response = await axios.get(`${API_URL}/item/${userId}`)
console.log(response.data)
setItems(response.data.foundedItems)
} 

return (
<>
<button className="Button" type="submit" onClick={handleDelete}>Remove Item</button>
</>
    )
}

export default DeleteItem;