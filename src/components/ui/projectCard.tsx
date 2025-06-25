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
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function ProjectCard({
  nome,
  descricao,
  imagem,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  return (
    <Card className="w-64 h-80 flex flex-col justify-between shadow-lg border border-gray-300 bg-white rounded-xl relative">
      <div className="absolute top-2 right-2 flex gap-2">
        <button onClick={onEdit} title="Editar">
          <img src="/public/edit.svg" alt="editar" className="w-5 h-5" />
        </button>
        <button onClick={onDelete} title="Excluir">
          <img src="/public/bin.svg" alt="excluir" className="w-5 h-5" />
        </button>
      </div>
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
