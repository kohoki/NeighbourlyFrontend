import axios from "axios";

const API_URL = "https://calm-lime-cobra-gear.cyclic.app";

function ChangeItemStatus({ itemId, borrower }) {
  function refreshPage() {
    window.location.reload(false);
  }

  const availableAgain = async (event) => {
    try {
      event.preventDefault();
      const bodyForItem = { id: borrower };
      await axios.put(`${API_URL}/item/${itemId}/status`, bodyForItem);
      refreshPage();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <button
        className="btn btn-secondary"
        type="button"
        onClick={availableAgain}
      >
        Item is available again.
      </button>
    </div>
  );
}

export default ChangeItemStatus;
