import axios from "axios";

const API_URL = "http://localhost:5005";

function DeleteAddress({addressId, addresses, setAddresses}) {

const handleDelete = () => {
console.log("eugh", addressId)
const deleteAddress = async() => {
const deletedAddress = await axios.delete(`${API_URL}/address/${addressId}/delete`)
console.log("BLU", deletedAddress)
}
deleteAddress()
setAddresses([addresses])
} 

return (
<>
<button type="submit" onClick={handleDelete}>Delete Address</button>
</>
    )
}



export default DeleteAddress;