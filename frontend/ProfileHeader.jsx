import { Camera, Pencil } from "lucide-react";
import { useRef, useState } from "react";
import API from "../services/api";

const ProfileHeader = () => {

  const fileInputRef = useRef();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  const uploadPhoto = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("photo", file);

    try {

      const { data } = await API.post(
        "/profile/upload-photo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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

    } catch (error) {

      console.log(error);

      alert("Image upload failed");

    }

  };

  return (

    <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-3xl shadow-xl overflow-hidden">

      <div className="h-40"></div>

      <div className="bg-white px-10 pb-8">

        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between -mt-16">

          <div className="flex flex-col lg:flex-row items-center gap-6">

            <div className="relative">

              <img
                src={
                  user.profileImage
                    ? `http://localhost:5000/${user.profileImage.replace(/\\/g, "/")}`
                    : "https://ui-avatars.com/api/?name=JobSpark&background=2563eb&color=fff&size=200"
                }
                alt="profile"
                className="w-36 h-36 rounded-full border-4 border-white shadow-xl object-cover"
              />

              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700"
              >
                <Camera size={18} />
              </button>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={uploadPhoto}
                hidden
              />

            </div>

            <div>

              <h1 className="text-4xl font-bold text-slate-800">
                {user.fullName || "Kumud Patkar"}
              </h1>

              <p className="text-slate-500 mt-2">
                {user.email}
              </p>

              <p className="text-blue-600 mt-2 font-medium">
                AI & ML Engineer
              </p>

            </div>

          </div>

          <button className="mt-6 lg:mt-0 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:scale-105 transition-all">

            <Pencil size={18} />

            Edit Profile

          </button>

        </div>

        <div className="mt-10">

          <div className="flex justify-between mb-2">

            <span className="font-semibold">
              Profile Completion
            </span>

            <span className="text-blue-600 font-bold">
              85%
            </span>

          </div>

          <div className="w-full bg-slate-200 rounded-full h-3">

            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full w-[85%]"></div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default ProfileHeader;