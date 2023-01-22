import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function EditItem({ itemId, userId }) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/profile/${userId}/item/${itemId}/edit`);
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <button className="btn btn-secondary" type="submit" onClick={handleEdit}>
        Edit Item Details
      </button>
    </div>
  );
}

export default EditItem;
