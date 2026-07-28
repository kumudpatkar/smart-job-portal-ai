import { Camera } from "lucide-react";

const Avatar = ({
  name = "",
  image = "",
  size = "md",
  onClick,
}) => {
  const getInitials = (fullName) => {
    if (!fullName) return "U";

    const words = fullName.trim().split(/\s+/);

    if (words.length === 1) {
      return words[0][0].toUpperCase();
    }

    return (
      words[0][0] +
      words[words.length - 1][0]
    ).toUpperCase();
  };

  const sizeClasses = {
    sm: "w-9 h-9 text-sm",
    md: "w-11 h-11 text-base",
    lg: "w-14 h-14 text-xl",
    xl: "w-20 h-20 text-3xl",
  };

  return (
    <div
      onClick={onClick}
      className="relative group cursor-pointer"
    >
      {image ? (
        <img
          src={image}
          alt={name}
          className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white shadow-lg`}
        />
      ) : (
        <div
          className={`${sizeClasses[size]}
          rounded-full
          bg-gradient-to-r
          from-blue-600
          to-indigo-600
          text-white
          font-bold
          flex
          items-center
          justify-center
          shadow-lg
          border-2
          border-white
          transition-all
          duration-300
          group-hover:scale-105`}
        >
          {getInitials(name)}
        </div>
      )}

      {/* Camera Overlay */}
      <div
        className="
          absolute
          inset-0
          rounded-full
          bg-black/40
          opacity-0
          group-hover:opacity-100
          transition
          duration-300
          flex
          items-center
          justify-center
        "
      >
        <Camera
          size={18}
          className="text-white"
        />
      </div>
    </div>
  );
};

export default Avatar;