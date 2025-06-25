import { cn } from "@/lib/utils";

export type KanbanTaskCardProps = {
  titulo: string;
  descricao: string;
  onEdit: () => void;
  onDelete: () => void;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
  canMoveLeft?: boolean;
  canMoveRight?: boolean;
  draggableProps?: React.HTMLAttributes<HTMLDivElement>;
  responsavel?: string; // email ou nome
};

export default function KanbanTaskCard({
  titulo,
  descricao,
  onEdit,
  onDelete,
  onMoveLeft,
  onMoveRight,
  canMoveLeft,
  canMoveRight,
  draggableProps,
  responsavel,
}: KanbanTaskCardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-gray-300 rounded-md shadow p-3 flex flex-col gap-2 relative",
        draggableProps?.className
      )}
      {...draggableProps}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-bold text-sky-800 break-words max-w-[80%]">
          {titulo}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="text-gray-500 hover:text-blue-700 cursor-pointer"
            title="Editar tarefa"
          >
            <img src="/public/edit.svg" alt="lixeira" />
          </button>
          <button
            onClick={onDelete}
            className="text-gray-500 hover:text-red-700 cursor-pointer"
            title="Excluir tarefa"
          >
            <img src="/public/bin.svg" alt="lixeira" />
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-600 break-words whitespace-pre-wrap">
        {descricao}
      </p>
      <div className="flex items-center gap-2 mt-2">
        <img
          src={`https://api.dicebear.com/8.x/bottts/svg?seed=${encodeURIComponent(
            responsavel || ""
          )}`}
          alt={responsavel}
          className="w-6 h-6 rounded-full border border-sky-300"
        />
        <span className="text-xs text-sky-800">{responsavel}</span>
      </div>
      <div className="flex justify-between mt-auto">
        {canMoveLeft ? (
          <button
            onClick={onMoveLeft}
            className="hover:text-sky-700 text-black cursor-pointer"
            title="Mover para a esquerda"
          >
            <img
              src="/public/arrow-left.svg"
              alt="mover para esquerda"
              style={{ filter: "brightness(0) saturate(100%)" }}
            />
          </button>
        ) : (
          <div />
        )}
        {canMoveRight && (
          <button
            onClick={onMoveRight}
            className="hover:text-sky-700 text-black cursor-pointer"
            title="Mover para a direita"
          >
            <img
              src="/public/arrow-right.svg"
              alt="mover para direita"
              style={{ filter: "brightness(0) saturate(100%)" }}
            />
          </button>
        )}
      </div>
    </div>
  );
}
