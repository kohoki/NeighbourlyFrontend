import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function EditItem({itemId, userId}) {
const navigate = useNavigate();
const handleEdit = () => {
navigate(`/profile/${userId}/item/${itemId}/edit`)
} 

return (
<>
<button type="submit" onClick={handleEdit}>Edit Item</button>
</>
    )
}

export default EditItem;