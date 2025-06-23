import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/");
  };
  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center text-5xl gap-5 bg-gradient-to-t from-red-700 to-red-500">
      <h1 className="text-white font-bold">Pagina não encontrada !</h1>
      <Button onClick={goToLogin} className="cursor-pointer">
        Voltar
      </Button>
    </main>
  );
}
