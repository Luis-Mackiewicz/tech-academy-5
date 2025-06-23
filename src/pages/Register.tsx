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
    <>
      <div className="bg-gradient-to-t from-sky-400  to-sky-700 h-screen w-screen flex justify-center items-center">
        <Card className="h-[60vh] w-[30vw] shadow-2xl border-black bg-white">
          <CardHeader>
            <CardTitle>Registrar</CardTitle>
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
                <Input placeholder="Digite seu nome" type="text" />
                <Input placeholder="Digite seu email" type="email" />
                <Input placeholder="Digite sua senha" type="password" />
                <Input placeholder="Digite seu CPF" type="text" />
                <Button className="bg-sky-700  w-[100%] cursor-pointer hover:bg-green-400">
                  Registrar
                </Button>
              </fieldset>
            </form>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </>
  );
}
