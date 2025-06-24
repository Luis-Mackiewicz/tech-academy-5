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
import { useForm } from "react-hook-form";

type ProfileForm = {
  nome: string;
  cpf: string;
  senha: string;
  confirmSenha: string;
};

export default function Profile() {
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [mensagem, setMensagem] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const email = "usuario@email.com";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      nome: "Nome do Usuário",
      cpf: "123.456.789-00",
      senha: "",
      confirmSenha: "",
    },
  });

  const nome = watch("nome");

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

  const onSubmit = (data: ProfileForm) => {
    setMensagem("Perfil atualizado com sucesso!");
  };

  const backPage = () => {
    navigate(-1);
  };

  return (
    <div className="bg-gradient-to-t from-sky-400 to-sky-700 h-screen w-screen flex justify-center items-center">
      <Card className="h-auto w-[90%] max-w-md p-6 shadow-2xl border border-gray-300 bg-white rounded-2xl">
        <CardHeader className="text-center mb-4 flex">
          <CardTitle className="font-black text-3xl text-sky-900 order-2 ml-auto">
            Meu Perfil
          </CardTitle>
          <CardAction className="order-1">
            <Button onClick={backPage} className="cursor-pointer">
              Voltar
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
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
                  placeholder="Digite seu nome"
                  type="text"
                  autoComplete="name"
                  {...register("nome", {
                    required: "Nome é obrigatório",
                    minLength: {
                      value: 3,
                      message: "Nome deve ter pelo menos 3 caracteres",
                    },
                    pattern: {
                      value: /^[A-Za-zÀ-ÿ\s]+$/,
                      message: "Nome deve conter apenas letras",
                    },
                  })}
                />
                {errors.nome && (
                  <span className="text-xs text-red-500">
                    {errors.nome.message}
                  </span>
                )}
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
                  placeholder="Digite seu CPF"
                  type="text"
                  autoComplete="off"
                  {...register("cpf", {
                    required: "CPF é obrigatório",
                    pattern: {
                      value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                      message: "CPF deve estar no formato 000.000.000-00",
                    },
                  })}
                />
                {errors.cpf && (
                  <span className="text-xs text-red-500">
                    {errors.cpf.message}
                  </span>
                )}
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
                  placeholder="Digite sua nova senha"
                  type="password"
                  autoComplete="new-password"
                  {...register("senha", {
                    required: "Senha é obrigatória",
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                      message:
                        "A senha deve ter pelo menos 8 caracteres e conter letras e números.",
                    },
                  })}
                />
                {errors.senha && (
                  <span className="text-xs text-red-500">
                    {errors.senha.message}
                  </span>
                )}
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
                  placeholder="Confirme sua nova senha"
                  type="password"
                  autoComplete="new-password"
                  {...register("confirmSenha", {
                    required: "Confirmação de senha é obrigatória",
                    validate: (value) =>
                      value === watch("senha") || "As senhas não coincidem.",
                  })}
                />
                {errors.confirmSenha && (
                  <span className="text-xs text-red-500">
                    {errors.confirmSenha.message}
                  </span>
                )}
              </div>

              {mensagem && (
                <div className="text-center text-sm text-green-600">
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
