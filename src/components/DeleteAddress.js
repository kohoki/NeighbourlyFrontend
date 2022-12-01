import axios from "axios";

const API_URL = "http://localhost:5005";

function DeleteAddress({ addressId, setAddresses, userId }) {
  const handleDelete = () => {
    const deleteAddress = async () => {
      await axios.delete(`${API_URL}/address/${userId}/delete/${addressId}`);
    };
    deleteAddress();
    const fetchAddress = async () => {
      let response = await axios.get(`${API_URL}/address/${userId}`);
      setAddresses(response.data.addresses);
    };
    fetchAddress();
  };

  return (
    <>
      <button type="submit" onClick={handleDelete}>
        Delete Address
      </button>
    </>
  );
}

export default DeleteAddress;
