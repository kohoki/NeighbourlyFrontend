import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

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
      <h1 className="textColor HomeH2">Add an image for your item</h1>
      <div className="InfoBox2">
      <form onSubmit={handleUpload}>
      <div className="mb-3" style={{width: "30vw"}}>
      <div class="mb-3">
      <label for="formFile" class="form-label">Images must be .png or .jpg</label>
        <input class="form-control" type="file" id="formFile" name="imageUrl" accept="image/png, image/jpg" />
        </div>
        </div>
        <button className="btn btn-light" type="submit">Upload</button>
      </form>
    </div>
    </div>
  );
}

export default LendImage;
