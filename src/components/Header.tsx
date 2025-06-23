import "@/index.css";
import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("home");
  };

  const goToTutorial = () => {
    navigate("tutorial");
  };

  const goToProjects = () => {
    navigate("projects");
  };

  return (
    <header>
      <nav>
        <ul>
          <li onClick={goToHome}>Home</li>
          <li onClick={goToTutorial}>Tutorial</li>
          <li onClick={goToProjects}>Projetos</li>
        </ul>
      </nav>
    </header>
  );
}
