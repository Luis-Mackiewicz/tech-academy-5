import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useForm,
  SubmitHandler,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import api from "../services/api";
import { AxiosError } from "axios";

// Esquema de validação para registro
const registerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z
    .string()
    .refine(
      (val) =>
        val.length >= 8 &&
        /[a-z]/.test(val) &&
        /[A-Z]/.test(val) &&
        /\d/.test(val) &&
        /[@$!%*?&]/.test(val),
      {
        message:
          "A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.",
      }
    ),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
});

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

// Tipos inferidos dos esquemas
type RegisterData = z.infer<typeof registerSchema>;
type LoginData = z.infer<typeof loginSchema>;

function Authentication() {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState<"login" | "register">("login");

  // Formulário de registro
  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors: registerErrors, isValid: isRegisterValid },
    watch: watchRegister,
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange", // Validação em tempo real
  });

  // Formulário de login
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors, isValid: isLoginValid },
    watch: watchLogin,
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange", // Validação em tempo real
  });

  // Função para registrar usuário
  const handleRegister: SubmitHandler<RegisterData> = async (data) => {
    try {
      await api.post("/auth/register", data);
      alert("Usuário registrado com sucesso!");
      navigate("/"); // Redireciona para a home
    } catch (error) {
      handleApiError(error);
    }
  };

  // Função para login
  const handleLogin: SubmitHandler<LoginData> = async (data) => {
    try {
      const response = await api.post("/auth/login", data);
      localStorage.setItem("token", response.data.token);
      alert("Login realizado com sucesso!");
      navigate("/"); // Redireciona para a home
    } catch (error) {
      handleApiError(error);
    }
  };

  // Tratamento de erros da API
  const handleApiError = (error: unknown) => {
    if (error instanceof AxiosError) {
      alert(error.response?.data?.message || "Erro ao processar a solicitação");
    } else {
      alert("Erro desconhecido");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-[400px] h-auto flex flex-col justify-between">
        <div>
          <Header activeForm={activeForm} setActiveForm={setActiveForm} />

          {activeForm === "register" ? (
            <form
              className="space-y-4"
              onSubmit={handleSubmitRegister(handleRegister)}
            >
              <RegisterFields
                register={registerRegister}
                errors={registerErrors}
                watch={watchRegister}
              />
              <Footer
                activeForm={activeForm}
                onSubmit={handleSubmitRegister(handleRegister)}
                navigate={navigate}
                isValid={isRegisterValid}
              />
            </form>
          ) : (
            <form
              className="space-y-4"
              onSubmit={handleSubmitLogin(handleLogin)}
            >
              <LoginFields
                register={registerLogin}
                errors={loginErrors}
                watch={watchLogin}
              />
              <Footer
                activeForm={activeForm}
                onSubmit={handleSubmitLogin(handleLogin)}
                navigate={navigate}
                isValid={isLoginValid}
              />
            </form>
          )}
        </div>
      </Card>
    </div>
  );
}

const Header = ({
  activeForm,
  setActiveForm,
}: {
  activeForm: "login" | "register";
  setActiveForm: React.Dispatch<React.SetStateAction<"login" | "register">>;
}) => (
  <div className="flex justify-end mb-6 space-x-4">
    <button
      className={`text-sm font-medium ${
        activeForm === "register"
          ? "text-gray-800"
          : "text-gray-400 hover:text-gray-600"
      }`}
      onClick={() => setActiveForm("register")}
    >
      Registrar
    </button>
    <button
      className={`text-sm font-medium ${
        activeForm === "login"
          ? "text-gray-800"
          : "text-gray-400 hover:text-gray-600"
      }`}
      onClick={() => setActiveForm("login")}
    >
      Login
    </button>
  </div>
);

const RegisterFields = ({
  register,
  errors,
  watch,
}: {
  register: UseFormRegister<RegisterData>;
  errors: FieldErrors<RegisterData>;
  watch: UseFormWatch<RegisterData>;
}) => (
  <>
    <div>
      <Label htmlFor="name">Nome</Label>
      <Input id="name" placeholder="Digite seu nome" {...register("name")} />
      {errors.name ? (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      ) : watch("name") ? (
        <p className="text-green-500 text-sm">Nome válido</p>
      ) : null}
    </div>
    <div>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="Digite seu email"
        {...register("email")}
      />
      {errors.email ? (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      ) : watch("email") ? (
        <p className="text-green-500 text-sm">Email válido</p>
      ) : null}
    </div>
    <div>
      <Label htmlFor="cpf">CPF</Label>
      <Input id="cpf" placeholder="Digite seu CPF" {...register("cpf")} />
      {errors.cpf ? (
        <p className="text-red-500 text-sm">{errors.cpf.message}</p>
      ) : watch("cpf") ? (
        <p className="text-green-500 text-sm">CPF válido</p>
      ) : null}
    </div>
    <div>
      <Label htmlFor="password">Senha</Label>
      <Input
        id="password"
        type="password"
        placeholder="Digite sua senha"
        {...register("password")}
      />
      {errors.password ? (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      ) : watch("password") ? (
        <p className="text-green-500 text-sm">Senha válida</p>
      ) : null}
    </div>
  </>
);

const LoginFields = ({
  register,
  errors,
  watch,
}: {
  register: UseFormRegister<LoginData>;
  errors: FieldErrors<LoginData>;
  watch: UseFormWatch<LoginData>;
}) => (
  <>
    <div>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="Digite seu email"
        {...register("email")}
      />
      {errors.email ? (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      ) : watch("email") ? (
        <p className="text-green-500 text-sm">Email válido</p>
      ) : null}
    </div>
    <div>
      <Label htmlFor="password">Senha</Label>
      <Input
        id="password"
        type="password"
        placeholder="Digite sua senha"
        {...register("password")}
      />
      {errors.password ? (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      ) : watch("password") ? (
        <p className="text-green-500 text-sm">Senha válida</p>
      ) : null}
    </div>
  </>
);

const Footer = ({
  activeForm,
  onSubmit,
  navigate,
  isValid,
}: {
  activeForm: "login" | "register";
  onSubmit: () => void;
  navigate: ReturnType<typeof useNavigate>;
  isValid: boolean;
}) => (
  <div className="flex flex-col space-y-2 mt-4">
    <Button
      variant="primary"
      className={`w-full ${
        isValid
          ? "bg-teal-600 hover:bg-teal-700 text-white"
          : "bg-gray-400 text-gray-700 cursor-not-allowed"
      }`}
      onClick={onSubmit}
      disabled={!isValid}
    >
      {activeForm === "register" ? "Registrar" : "Login"}
    </Button>
    <Button variant="secondary" className="w-full" onClick={() => navigate(-1)}>
      Voltar
    </Button>
  </div>
);

export default Authentication;
