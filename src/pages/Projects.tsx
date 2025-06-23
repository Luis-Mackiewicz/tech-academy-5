import Header from "@/components/Header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function Projects() {
  const navigate = useNavigate();

  const goToCreteNewProject = () => {
    navigate("/create-new-project");
  };

  const plusIcon = "/public/plus.svg";
  const arrowLeftIcon = "/public/arrow-left.svg";
  const arrowRightIcon = "/public/arrow-right.svg";
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-t from-sky-400 to-sky-700">
      <Header />
      <Card className=" bg-sky-200 flex self-center h-[60vh] w-[60vw] m-auto border border-black">
        <CardHeader>
          <CardTitle className="font-black">Projetos</CardTitle>
          <CardDescription>Visualize todos os seus projetos</CardDescription>
          <CardAction className="flex gap-4">
            <Input
              placeholder="pesquisar"
              className="flex bg-white border border-black"
            />
            <Button
              onClick={goToCreteNewProject}
              title="Novo projeto"
              className="bg-sky-500 hover:bg-teal-500 cursor-pointer"
            >
              <img src={plusIcon} alt="Criar projeto" />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter>
          <Button className="bg-sky-500 hover:bg-teal-500 cursor-pointer">
            <img src={arrowLeftIcon} alt="back" />
          </Button>
          <Button className="bg-sky-500 hover:bg-teal-500 cursor-pointer">
            <img src={arrowRightIcon} alt="next" />
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
