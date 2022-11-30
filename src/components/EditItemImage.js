import { useNavigate } from "react-router-dom";

function EditItemImage({itemId}) {
const navigate = useNavigate();
const handleEdit = () => {
navigate(`/lend/${itemId}/image`)
} 

return (
<>
<button className="Button" type="submit" onClick={handleEdit}>Update Item Image</button>
</>
    )
}

export default EditItemImage;