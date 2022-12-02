import { useNavigate } from "react-router-dom";

function EditAddress({ addressId, userId }) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/profile/${userId}/address/${addressId}/edit`);
  };

<<<<<<< HEAD
  return (
    <>
      <button type="submit" onClick={handleEdit}>
        Edit Address
      </button>
    </>
  );
=======
return (
<>
<button className="btn btn-light" type="submit" onClick={handleEdit}>Edit Address</button>
</>
    )
>>>>>>> master
}

export default EditAddress;
