import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "https://calm-lime-cobra-gear.cyclic.app";

function LendImage() {
  const { user } = useContext(AuthContext);
  const { itemId } = useParams();
  const navigate = useNavigate();
  const handleUpload = async (event) => {
    event.preventDefault();
    const image = event.target.imageUrl.files[0];
    const formData = new FormData();
    formData.append("imageUrl", image);
    await axios.post(`${API_URL}/api/${itemId}/upload/item`, formData);
    navigate(`/profile/lentItems/${user._id}`);
  };

  return (
    <div className="backgroundColor">
      <h1 className="textColor">Add an image for your item</h1>
      <form onSubmit={handleUpload}>
      <div className="mb-3" style={{width: "30vw"}}>
        <input type="file" name="imageUrl" accept="image/png, image/jpg" />
        </div>
        <button className="btn btn-light" type="submit">Upload</button>
      </form>
    </div>
  );
}

export default LendImage;
