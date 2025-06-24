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
import { useRef, useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const goToLogin = () => {
    navigate("/");
  };

  const dicebearURL = `https://api.dicebear.com/8.x/bottts/svg?seed=${encodeURIComponent(
    nome || "TaskFlowUser"
  )}`;

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const avatarPreview = avatarFile
    ? URL.createObjectURL(avatarFile)
    : dicebearURL;

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
          <form className="w-full">
            <fieldset className="flex flex-col gap-4">
              <div className="w-full flex justify-center">
                <img
                  src={avatarPreview}
                  alt="Avatar de perfil"
                  onClick={handleAvatarClick}
                  className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover shadow-md cursor-pointer hover:scale-105 transition-transform duration-200"
                  title="Clique para escolher uma imagem personalizada"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Campos do formulário */}
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
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
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
                <Button
                  className="bg-sky-700 w-full mt-2 hover:bg-sky-800 transition-colors duration-200 text-white font-semibold py-2 cursor-pointer"
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
