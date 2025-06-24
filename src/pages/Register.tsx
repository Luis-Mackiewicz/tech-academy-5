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
      <Card className="h-[70vh] w-[30vw] shadow-2xl border-black bg-white">
        <CardHeader>
          <CardTitle className="font-black text-sky-900">Registrar</CardTitle>
          <CardAction>
            <p onClick={goToLogin} className="cursor-pointer opacity-60">
              <strong>Login</strong>
            </p>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-1 items-center justify-center">
          <form action="" className="w-full">
            <fieldset className="flex flex-col items-center gap-4 w-full">
              <legend className="font-bold">Preencha os campos:</legend>

              <div className="w-full px-4">
                <label htmlFor="nome" className="block text-sm font-semibold">
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

              <div className="w-full px-4">
                <label htmlFor="email" className="block text-sm font-semibold">
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

              <div className="w-full px-4">
                <label htmlFor="senha" className="block text-sm font-semibold">
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

              <div className="w-full px-4">
                <label htmlFor="cpf" className="block text-sm font-semibold">
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

              <div className="w-full px-4">
                <Button
                  className="bg-sky-700 w-full cursor-pointer hover:bg-green-400"
                  type="submit"
                >
                  Registrar
                </Button>
              </div>
            </fieldset>
          </form>
        </CardContent>
        <CardFooter />
      </Card>
    </div>
  );
}
