function Header() {
  const currentPath = "/";

  return (
    <header className="bg-teal-800 h-20 w-full max-w-[1440px] mt-4 mx-auto px-4 md:px-8 rounded flex items-center">
      <nav className="w-full flex items-center">
        {/* Logo Taskflow */}
        <div className="mr-8">
          <span className="text-1xl font-bold text-teal-200">TASKFLOW</span>
        </div>

        {/* Navegação */}
        <ul className="flex gap-1 text-teal-50 font-medium">
          <li>
            <a
              href="/"
              className={`block px-4 py-2 rounded-[4px] transition-colors duration-200 ${
                currentPath === "/"
                  ? "bg-[#f4fbfa] text-gray-900"
                  : "hover:bg-[#161d1d]"
              }`}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/projetos"
              className={`block px-4 py-2 rounded-[4px] transition-colors duration-200 ${
                currentPath === "/projetos"
                  ? "bg-[#f4fbfa] text-gray-900"
                  : "hover:bg-[#161d1d]"
              }`}
            >
              Projetos
            </a>
          </li>
          <li>
            <a
              href="/config"
              className={`block px-4 py-2 rounded-[4px] transition-colors duration-200 ${
                currentPath === "/config"
                  ? "bg-[#f4fbfa] text-gray-900"
                  : "hover:bg-[#161d1d]"
              }`}
            >
              Config
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
