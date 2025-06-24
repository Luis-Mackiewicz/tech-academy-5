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

export default function Login() {
  const navigate = useNavigate();
  const goToRegistration = () => {
    navigate("register");
  };

  return (
    <div className="bg-gradient-to-t from-sky-400 to-sky-700 h-screen w-screen flex justify-center items-center">
      <Card className="h-[60vh] w-[30vw] shadow-2xl border-black bg-white">
        <CardHeader>
          <CardTitle className="font-black text-sky-900">Login</CardTitle>
          <CardAction>
            <p onClick={goToRegistration} className="cursor-pointer opacity-60">
              <strong>Registrar</strong>
            </p>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-1 items-center justify-center">
          <form action="" className="w-full">
            <fieldset className="flex flex-col items-center gap-4 w-full">
              <legend className="font-bold">Preencha os campos:</legend>

              <div className="w-full px-4">
                <label htmlFor="email" className="block font-semibold text-sm">
                  E-mail
                </label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Digite seu e-mail"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="w-full px-4">
                <label htmlFor="senha" className="block font-semibold text-sm">
                  Senha
                </label>
                <Input
                  id="senha"
                  name="senha"
                  placeholder="Digite a sua senha"
                  type="password"
                  autoComplete="current-password"
                  required
                />
              </div>

              <div className="w-full px-4">
                <Button
                  className="bg-sky-700 w-full cursor-pointer hover:bg-green-400"
                  type="submit"
                >
                  Login
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
