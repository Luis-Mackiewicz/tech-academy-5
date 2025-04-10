import { Link } from "react-router-dom";
import NotFoundImage from "../assets/notFoundImage.svg";
import { Card } from "../components/ui/Card";

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[90%] md:w-[60%] max-w-[800px] flex flex-col items-center justify-center">
        <div className="w-full flex justify-center mb-4">
          <img
            className="h-24 md:h-32 object-contain"
            src={NotFoundImage}
            alt="Página não encontrada"
          />
        </div>
        <div className="text-center px-4 py-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
            Página não encontrada
          </h2>
          <p className="text-gray-600 mb-5">
            A página que você tentou acessar não está disponível no momento.
          </p>
          <Link
            to="/"
            className="inline-block bg-teal-500 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default NotFound;
