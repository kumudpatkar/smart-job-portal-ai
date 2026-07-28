import { useRef, useState } from "react";
import API from "../../services/api";
import { Camera } from "lucide-react";

function UploadProfileImage({ image, onUpload }) {
  const inputRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const uploadImage = async (file) => {
    const formData = new FormData();

    formData.append("image", file);

    try {
      setLoading(true);

      const { data } = await API.put(
        "/profile-image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onUpload(data.image);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert("Profile picture updated!");

    } catch (error) {

      console.log(error);

      alert("Upload failed.");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="flex justify-center mb-8">

      <div className="relative">

        <img
          src={
            image ||
            "https://ui-avatars.com/api/?background=2563eb&color=fff&name=User"
          }
          alt="Profile"
          className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
        />

        <button
          onClick={() => inputRef.current.click()}
          className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
        >
          <Camera size={20} />
        </button>

        <input
          ref={inputRef}
          hidden
          type="file"
          accept="image/*"
          onChange={(e) => uploadImage(e.target.files[0])}
        />

      </div>

      {loading && (
        <p className="ml-5 font-semibold">
          Uploading...
        </p>
      )}

    </div>
  );
}

export default UploadProfileImage;