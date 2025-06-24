import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-t from-sky-400 to-sky-700 h-screen w-screen flex justify-center items-center">
      <Card className="h-auto w-[90%] max-w-md p-6 shadow-2xl border border-gray-300 bg-white rounded-2xl">
        <CardHeader className="text-center mb-4">
          <CardTitle className="font-black text-3xl text-sky-900 mr-auto">
            Registrar
          </CardTitle>
          <CardAction>
            <p
              onClick={goToLogin}
              className="cursor-pointer text-sm text-sky-600 hover:text-sky-800 transition-colors duration-200"
            >
              Já tem uma conta? <strong>Login</strong>
            </p>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form action="" className="w-full" encType="multipart/form-data">
            <fieldset className="flex flex-col gap-4">
              <legend className="font-semibold text-sky-800 mb-2">
                Preencha os campos:
              </legend>

              <div className="w-full">
                <label
                  htmlFor="nome"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nome completo
                </label>
                <Input
                  id="nome"
                  name="nome"
                  placeholder="Digite seu nome"
                  type="text"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  E-mail
                </label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Digite seu email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="senha"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Senha
                </label>
                <Input
                  id="senha"
                  name="senha"
                  placeholder="Digite sua senha"
                  type="password"
                  autoComplete="new-password"
                  required
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="cpf"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  CPF
                </label>
                <Input
                  id="cpf"
                  name="cpf"
                  placeholder="Digite seu CPF"
                  type="text"
                  autoComplete="off"
                  required
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="fotoPerfil"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Foto de perfil <span className="text-red-500">*</span>
                </label>
                <input
                  id="fotoPerfil"
                  name="fotoPerfil"
                  type="file"
                  accept="image/*"
                  required
                  className="w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-sky-700 file:text-white hover:file:bg-sky-800 transition-all duration-200"
                />
              </div>

              <div className="w-full">
                <Button
                  className="bg-sky-700 w-full mt-2 hover:bg-sky-800 transition-colors duration-200 text-white font-semibold py-2"
                  type="submit"
                >
                  Registrar
                </Button>
              </div>
            </fieldset>
          </form>
        </CardContent>

        <CardFooter className="text-center text-xs text-gray-400 pt-2">
          © {new Date().getFullYear()} TaskFlow
        </CardFooter>
      </Card>
    </div>
  );
}
