import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";

type ProjectCardProps = {
  nome: string;
  descricao: string;
  imagem: string;
};

export default function ProjectCard({
  nome,
  descricao,
  imagem,
}: ProjectCardProps) {
  return (
    <Card className="w-64 h-80 flex flex-col justify-between shadow-lg border border-gray-300 bg-white rounded-xl">
      <CardHeader>
        <CardTitle className="text-lg font-bold">{nome}</CardTitle>
      </CardHeader>
      <CardContent>
        {imagem && (
          <img
            src={imagem}
            alt={nome}
            className="w-full h-32 object-cover rounded-lg mb-2"
          />
        )}
        <CardDescription className="text-gray-700">{descricao}</CardDescription>
      </CardContent>
    </Card>
  );
}
