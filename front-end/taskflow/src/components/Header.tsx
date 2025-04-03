import ProfileButton from "./ProfileButton";
function Header() {
  const currentPath = "/";

  return (
    <header className="bg-[#004345] h-20 w-full max-w-[1440px] mt-4 mx-auto px-4 md:px-8 rounded flex items-center">
      <nav className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-8">
            <span className="text-xl font-bold text-[#97D1D2]">TASKFLOW</span>
          </div>

          <ul className="flex gap-1 text-[#FFFFFF] font-medium">
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
        </div>
        <ProfileButton />
      </nav>
    </header>
  );
}

export default Header;
