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
            className="text-gray-500 hover:text-blue-700"
            title="Editar tarefa"
          >
            ✏️
          </button>
          <button
            onClick={onDelete}
            className="text-gray-500 hover:text-red-700"
            title="Excluir tarefa"
          >
            🗑️
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-600 break-words whitespace-pre-wrap">
        {descricao}
      </p>
      <div className="flex justify-between mt-auto">
        {canMoveLeft ? (
          <button
            onClick={onMoveLeft}
            className="text-gray-500 hover:text-sky-700"
            title="Mover para a esquerda"
          >
            ◀️
          </button>
        ) : (
          <div />
        )}
        {canMoveRight && (
          <button
            onClick={onMoveRight}
            className="text-gray-500 hover:text-sky-700"
            title="Mover para a direita"
          >
            ▶️
          </button>
        )}
      </div>
    </div>
  );
}
