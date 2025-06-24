import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CreateNewProject() {
  const navigate = useNavigate();
  const backToProjectsPage = () => {
    navigate("/projects");
  };

  return (
    <main className=" flex justify-center items-center h-screen w-screen bg-linear-to-t from-sky-400 to-sky-500">
      <Card className="h-[50vh] w-[40vw] border border-black">
        <CardHeader>
          <CardTitle>Criar Projeto</CardTitle>
          <CardDescription>
            Adicione os detalhes do seu projeto para começar a organizar suas
            tarefas.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 mt-auto">
          <Input type="text" placeholder="Nome" />
          <Textarea placeholder="Descrição" />
        </CardContent>
        <CardFooter className="flex flex-row w-full mt-auto">
          <Button
            onClick={backToProjectsPage}
            className="items-start  text-card w-[9%] bg-gray-600 cursor-pointer"
          >
            Voltar
          </Button>
          <Button className="ml-auto w-[90%] bg-sky-700 hover:bg-teal-500 cursor-pointer">
            Criar
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
