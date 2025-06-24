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
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

export default function Profile() {
  const navigate = useNavigate();

  const backPage = () => {
    navigate(-1);
  };

  const [nome, setNome] = useState("Nome do Usuário");
  const [email] = useState("usuario@email.com");
  const [cpf, setCpf] = useState("123.456.789-00");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const dicebearURL = `https://api.dicebear.com/8.x/bottts/svg?seed=${encodeURIComponent(
    nome || "TaskFlowUser"
  )}`;

  const avatarPreview = avatarFile
    ? URL.createObjectURL(avatarFile)
    : dicebearURL;

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  function validarCPF(cpf: string) {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
  }

  function validarSenha(s: string) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(s);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarCPF(cpf)) {
      setMensagem("CPF inválido.");
      return;
    }
    if (!validarSenha(senha)) {
      setMensagem(
        "A senha deve ter pelo menos 8 caracteres e conter letras e números."
      );
      return;
    }
    if (senha !== confirmSenha) {
      setMensagem("As senhas não coincidem.");
      return;
    }
    setMensagem("Perfil atualizado com sucesso!");
  };

  return (
    <div className="bg-gradient-to-t from-sky-400 to-sky-700 h-screen w-screen flex justify-center items-center">
      <Card className="h-auto w-[90%] max-w-md p-6 shadow-2xl border border-gray-300 bg-white rounded-2xl">
        <CardHeader className="text-center mb-4 flex">
          <CardTitle className="font-black text-3xl text-sky-900  order-2 ml-auto">
            Meu Perfil
          </CardTitle>
          <CardAction className="order-1 ">
            <Button onClick={backPage} className="cursor-pointer">
              Voltar
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form className="w-full" onSubmit={handleSubmit}>
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
                  type="email"
                  value={email}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
                <span className="text-xs text-gray-400">
                  O e-mail não pode ser alterado.
                </span>
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
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="senha"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nova senha
                </label>
                <Input
                  id="senha"
                  name="senha"
                  placeholder="Digite sua nova senha"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="confirmSenha"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirmar nova senha
                </label>
                <Input
                  id="confirmSenha"
                  name="confirmSenha"
                  placeholder="Confirme sua nova senha"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmSenha}
                  onChange={(e) => setConfirmSenha(e.target.value)}
                />
              </div>

              {mensagem && (
                <div className="text-center text-sm text-red-500">
                  {mensagem}
                </div>
              )}

              <div className="w-full">
                <Button
                  className="bg-sky-700 w-full mt-2 hover:bg-sky-800 transition-colors duration-200 text-white font-semibold py-2 cursor-pointer"
                  type="submit"
                >
                  Salvar alterações
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
