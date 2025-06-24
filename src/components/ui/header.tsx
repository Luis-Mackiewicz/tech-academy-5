import "@/index.css";
import { useNavigate, useLocation } from "react-router";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);

  const nome = "Nome do Usuário";
  const dicebearURL = `https://api.dicebear.com/8.x/bottts/svg?seed=${encodeURIComponent(
    nome || "TaskFlowUser"
  )}`;

  const navItems = [
    { label: "Home", path: "/home" },
    { label: "Tutorial", path: "/tutorial" },
    { label: "Projetos", path: "/projects" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

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

          <li className="ml-auto relative" ref={menuRef}>
            <img
              src={dicebearURL}
              alt="Avatar"
              className="w-10 h-10 rounded-full border-2 border-blue-400 shadow cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => setMenuOpen((open) => !open)}
              title="Abrir menu do perfil"
            />
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-50 flex flex-col">
                <button
                  className="px-4 py-2 text-left hover:bg-blue-100 rounded-t-xl cursor-pointer"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/profile");
                  }}
                >
                  Perfil
                </button>
                <button
                  className="px-4 py-2 text-left hover:bg-red-300 rounded-b-xl cursor-pointer"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/");
                  }}
                >
                  Sair
                </button>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
