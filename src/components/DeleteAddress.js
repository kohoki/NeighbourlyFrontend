import axios from "axios";

const API_URL = "https://calm-lime-cobra-gear.cyclic.app";

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
      <button className="btn btn-light" type="submit" onClick={handleDelete}>
        Delete Address
      </button>
    </>
  );
}

export default DeleteAddress;
