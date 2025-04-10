import { Link, useLocation } from "react-router-dom";
import ProfileButton from "../components/ui/ProfieButton";

function Header() {
  const location = useLocation();

  return (
    <header className="bg-[#004345] h-[8vh] w-[90vw] mt-[4vh] mx-auto md:px-8 flex items-center">
      <nav className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-8">
            <span className="text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-[#84b3b4]">
              TASKFLOW
            </span>
          </div>

          <ul className="flex gap-1 text-[#FFFFFF] font-medium">
            <li>
              <Link
                to="/"
                className={`px-4 py-2 rounded-[4px] transition-colors duration-200 ${
                  location.pathname === "/"
                    ? "bg-[#f4fbfa] text-gray-900"
                    : "hover:bg-[#161d1d]"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`px-4 py-2 rounded-[4px] transition-colors duration-200 ${
                  location.pathname === "/about"
                    ? "bg-[#f4fbfa] text-gray-900"
                    : "hover:bg-[#161d1d]"
                }`}
              >
                Sobre
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className={`px-4 py-2 rounded-[4px] transition-colors duration-200 ${
                  location.pathname === "/projects"
                    ? "bg-[#f4fbfa] text-gray-900"
                    : "hover:bg-[#161d1d]"
                }`}
              >
                Projetos
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className={`px-4 py-2 rounded-[4px] transition-colors duration-200 ${
                  location.pathname === "/settings"
                    ? "bg-[#f4fbfa] text-gray-900"
                    : "hover:bg-[#161d1d]"
                }`}
              >
                Config
              </Link>
            </li>
          </ul>
        </div>
        <ProfileButton />
      </nav>
    </header>
  );
}

export default Header;
