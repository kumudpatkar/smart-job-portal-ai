import { Camera } from "lucide-react";
import { useRef, useState } from "react";
import API from "../services/api";

const ProfileHeader = () => {
  const storedUser =
    JSON.parse(localStorage.getItem("user")) || {};

  const [user, setUser] = useState(storedUser);

  const fileInputRef = useRef(null);

  const userName =
    user.name ||
    user.fullName ||
    "Your Name";

  // Generate Initials
  const getInitials = (name) => {
    if (!name || name === "Your Name") return "U";

    const words = name.trim().split(/\s+/);

    if (words.length === 1) {
      return words[0][0].toUpperCase();
    }

    return (
      words[0][0] +
      words[words.length - 1][0]
    ).toUpperCase();
  };

  // Open File Picker
  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  // Upload Image
  const uploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await API.put(
        "/profile-image/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      const updatedUser = {
        ...user,
        profileImage: data.image,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setUser(updatedUser);

      alert("Profile photo updated successfully.");

    } catch (error) {
      console.log(error);
      alert("Image upload failed.");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">

      {/* Avatar */}
      <div className="relative">

        {user.profileImage ? (
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-blue-500"
          />
        ) : (
          <div
            className="w-36 h-36 rounded-full
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            border-4 border-blue-500
            flex
            items-center
            justify-center
            text-white
            text-5xl
            font-bold"
          >
            {getInitials(userName)}
          </div>
        )}

        {/* Camera Button */}
        <button
          onClick={openFilePicker}
          className="absolute bottom-1 right-1 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
        >
          <Camera size={18} />
        </button>

        {/* Hidden Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={uploadImage}
        />

      </div>

      {/* User Info */}
      <div className="flex-1">

        <h2 className="text-3xl font-bold text-slate-800">
          {userName}
        </h2>

        <p className="text-slate-500 mt-2">
          AI & ML Engineer • Software Developer • Problem Solver
        </p>

        <div className="flex flex-wrap gap-3 mt-5">

          <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm">
            AI / ML
          </span>

          <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm">
            Java
          </span>

          <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm">
            React
          </span>

          <span className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm">
            Python
          </span>

        </div>

      </div>

    </div>
  );
};

export default ProfileHeader;