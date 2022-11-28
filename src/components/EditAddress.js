import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function EditAddress({addressId, setAddresses, userId}) {
const navigate = useNavigate();
const handleEdit = () => {
navigate(`/profile/${userId}/address/${addressId}/edit`)
} 

return (
<>
<button type="submit" onClick={handleEdit}>Edit Address</button>
</>
    )
}

export default EditAddress;