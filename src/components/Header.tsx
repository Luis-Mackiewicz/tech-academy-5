import "@/index.css";
import { useNavigate, useLocation } from "react-router";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/home" },
    { label: "Tutorial", path: "/tutorial" },
    { label: "Projetos", path: "/projects" },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-100 to-blue-300 w-[90vw] max-w-5xl mx-auto mt-6 border border-blue-300 rounded-3xl shadow-xl">
      <nav>
        <ul className="flex justify-center items-center p-6 gap-8">
          {navItems.map((item) => (
            <li
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`cursor-pointer px-4 py-2 rounded-xl transition-all duration-200
                ${
                  location.pathname === item.path
                    ? "bg-blue-500 text-white font-bold shadow-md"
                    : "hover:bg-blue-200 hover:text-blue-900"
                }
              `}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
