import Header from "@/components/ui/header";
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
import ProjectCard from "@/components/ui/projectCard";

export default function Projects() {
  const navigate = useNavigate();

  const goToCreteNewProject = () => {
    navigate("/create-new-project");
  };

  const projetos: Array<{
    nome: string;
    descricao: string;
    imagem: string;
  }> = JSON.parse(localStorage.getItem("projetos") || "[]");

  const plusIcon = "/plus.svg";
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
        <CardContent>
          <div className="flex flex-wrap gap-6 w-full h-full items-center justify-center">
            {projetos.length === 0 ? (
              <span className="text-gray-500 text-center w-full mt-[15%]">
                Nenhum projeto cadastrado.
              </span>
            ) : (
              projetos.map((proj, idx) => (
                <ProjectCard
                  key={idx}
                  nome={proj.nome}
                  descricao={proj.descricao}
                  imagem={proj.imagem}
                  onEdit={() =>
                    navigate(`/edit-project/${idx}`, { state: { index: idx } })
                  }
                  onKanban={() => navigate(`/kanban/${idx}`)}
                  onDelete={() => {
                    const projetos = JSON.parse(
                      localStorage.getItem("projetos") || "[]"
                    );
                    projetos.splice(idx, 1);
                    localStorage.setItem("projetos", JSON.stringify(projetos));
                    window.location.reload();
                  }}
                />
              ))
            )}
          </div>
        </CardContent>
        <CardFooter className=" flex self-end gap-4 mt-auto">
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
