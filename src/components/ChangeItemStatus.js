import axios from "axios";

const API_URL = "https://calm-lime-cobra-gear.cyclic.app"
;

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
    <>
      <button className="Button" type="button" onClick={availableAgain}>
        Item is available again.
      </button>
    </>
  );
}

export default ChangeItemStatus;
