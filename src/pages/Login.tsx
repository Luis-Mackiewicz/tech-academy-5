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
    <>
      <div className="bg-gradient-to-t from-sky-400  to-sky-700 h-screen w-screen flex justify-center items-center">
        <Card className="h-[60vh] w-[30vw] shadow-2xl border-black bg-white">
          <CardHeader>
            <CardTitle className="font-black text-sky-900">Login</CardTitle>
            <CardAction>
              <p
                onClick={goToRegistration}
                className="cursor-pointer opacity-60"
              >
                <strong>Registrar</strong>
              </p>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-1 items-center justify-center">
            <form action="" className="w-full">
              <fieldset className="flex flex-col items-center gap-4 w-full">
                <legend className="font-bold">Preencha os campos:</legend>
                <Input placeholder="Digite seu e-mail" type="email" />
                <Input placeholder="Digite a sua senha" type="password" />

                <Button className="bg-sky-700  w-[100%] cursor-pointer hover:bg-green-400">
                  Login
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
