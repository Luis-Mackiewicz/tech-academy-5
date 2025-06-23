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
        <Card className="h-[80vh] w-[50vw] shadow-2xl border-black bg-white">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardAction>
              <Button
                onClick={goToRegistration}
                className="cursor-pointer bg-sky-700 hover:bg-green-400"
              >
                <strong>Registrar</strong>
              </Button>
            </CardAction>
            <CardContent>
              <form action="">
                <fieldset>
                  <Input placeholder="Digite seu nome" type="text" />
                  <Input placeholder="Digite seu email" type="email" />
                  <Button className="bg-sky-700  w-[100%] cursor-pointer hover:bg-green-400">
                    Login
                  </Button>
                </fieldset>
              </form>
            </CardContent>
            <CardFooter></CardFooter>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}
