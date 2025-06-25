type KanbanTableProps = {
  title: string;
  color: string;
  children?: React.ReactNode;
  onAddTask?: () => void;
};

export default function KanbanTable({
  title,
  color,
  children,
  onAddTask,
}: KanbanTableProps) {
  return (
    <section
      className={`flex flex-col rounded-xl shadow-lg p-4 w-80 min-h-[60vh] bg-white border-t-8 ${color}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-center">{title}</h2>
        {onAddTask && (
          <button
            onClick={onAddTask}
            className="bg-sky-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-sky-700"
            title="Adicionar tarefa"
          >
            +
          </button>
        )}
      </div>
      <div className="flex-1 flex flex-col gap-2">
        {children ? (
          children
        ) : (
          <span className="text-gray-400 text-center">Sem tarefas</span>
        )}
      </div>
    </section>
  );
}
