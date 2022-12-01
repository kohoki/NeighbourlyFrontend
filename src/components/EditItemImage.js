import { useNavigate } from "react-router-dom";

function EditItemImage({ itemId }) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/lend/${itemId}/image`);
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <button className="btn btn-secondary" type="submit" onClick={handleEdit}>
        Update Item Image
      </button>
    </div>
  );
}

export default EditItemImage;
