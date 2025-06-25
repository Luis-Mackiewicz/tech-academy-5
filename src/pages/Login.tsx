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
import { useForm } from "react-hook-form";
import { login } from "@/services/auth.service";
import { useState } from "react";

type LoginForm = {
  email: string;
  senha: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const goToRegistration = () => {
    navigate("register");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setError(null);
    try {
      await login({ email: data.email, password: data.senha });
      navigate("/home");
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          "Erro ao fazer login. Verifique suas credenciais."
      );
    }
  };

  return (
    <div className="bg-gradient-to-t from-sky-400 to-sky-700 h-screen w-screen flex justify-center items-center">
      <Card className="h-auto w-[90%] max-w-md p-6 shadow-2xl border border-gray-300 bg-white rounded-2xl">
        <CardHeader className="text-center mb-4">
          <CardTitle className="font-black text-3xl text-sky-900 mr-auto">
            Login
          </CardTitle>
          <CardAction>
            <p
              onClick={goToRegistration}
              className="cursor-pointer text-sm text-sky-600 hover:text-sky-800 transition-colors duration-200"
            >
              Não tem conta? <strong>Registrar</strong>
            </p>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
            <fieldset className="flex flex-col gap-4">
              <legend className="font-semibold text-sky-800 mb-2">
                Preencha os campos:
              </legend>

              <div className="w-full">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  E-mail
                </label>
                <Input
                  id="email"
                  placeholder="Digite seu e-mail"
                  type="email"
                  autoComplete="email"
                  {...register("email", {
                    required: "E-mail é obrigatório",
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "E-mail inválido",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-xs text-red-500">
                    {errors.email.message}
                  </span>
                )}
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
                  placeholder="Digite a sua senha"
                  type="password"
                  autoComplete="current-password"
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

              {error && <span className="text-xs text-red-500">{error}</span>}

              <div className="w-full">
                <Button
                  type="submit"
                  className="bg-sky-700 w-full mt-2 hover:bg-sky-800 transition-colors duration-200 text-white font-semibold py-2"
                >
                  Entrar
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
