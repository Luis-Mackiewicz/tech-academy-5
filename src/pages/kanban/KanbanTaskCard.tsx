type KanbanTaskCardProps = {
  titulo: string;
  descricao: string;
  onEdit: () => void;
  onDelete: () => void;
};

export default function KanbanTaskCard({
  titulo,
  descricao,
  onEdit,
  onDelete,
}: KanbanTaskCardProps) {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow p-3 mb-2 relative">
      <button
        onClick={onEdit}
        className="absolute top-2 right-10 text-gray-500 hover:text-blue-700"
        title="Editar tarefa"
      >
        <span role="img" aria-label="edit">
          ✏️
        </span>
      </button>
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-700"
        title="Excluir tarefa"
      >
        <span role="img" aria-label="delete">
          🗑️
        </span>
      </button>
      <h3 className="font-bold text-base text-sky-800">{titulo}</h3>
      <p className="text-sm text-gray-600">{descricao}</p>
    </div>
  );
}
