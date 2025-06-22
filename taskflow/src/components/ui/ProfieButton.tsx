import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../services/auth.service";

function ProfileButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLoggedIn()) {
      navigate("/profile");
    } else {
      navigate("/authentication");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-[#4a6364] hover:bg-[#3a5253] transition-all duration-200 relative group 
        shadow-lg shadow-teal-900/50 hover:shadow-xl hover:shadow-teal-900/60"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-5 h-5 text-teal-100"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
        Meu Perfil
      </span>
    </button>
  );
}

export default ProfileButton;
