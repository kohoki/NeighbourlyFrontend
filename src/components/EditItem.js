import { useNavigate } from "react-router-dom";

function EditItem({ itemId, userId }) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/profile/${userId}/item/${itemId}/edit`);
  };

  return (
    <>
      <button type="submit" onClick={handleEdit}>
        Edit Item Details
      </button>
    </>
  );
}

export default EditItem;
