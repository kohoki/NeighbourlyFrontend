import axios from "axios";

const API_URL = "https://calm-lime-cobra-gear.cyclic.app";

function DeleteItem({ itemId, setItems, userId }) {
  const handleDelete = async (e) => {
    e.preventDefault();
    await axios.delete(`${API_URL}/item/${userId}/delete/${itemId}`);
    let response = await axios.get(`${API_URL}/item/${userId}`);
    setItems(response.data.foundedItems);
  };

  return (
    <>
      <button className="Button" type="button" onClick={handleDelete}>
        Remove Item
      </button>
    </>
  );
}

export default DeleteItem;
