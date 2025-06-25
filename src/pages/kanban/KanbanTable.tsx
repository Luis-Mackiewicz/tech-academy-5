import React from "react";

export type KanbanTableProps = {
  title: string;
  color: string;
  children?: React.ReactNode;
  onAddTask?: () => void;
  onDropTask?: (taskId: number) => void;
  onDragOverTask?: (e: React.DragEvent) => void;
};

export default function KanbanTable({
  title,
  color,
  children,
  onAddTask,
  onDropTask,
  onDragOverTask,
}: KanbanTableProps) {
  return (
    <section
      className={`flex flex-col rounded-xl shadow-lg p-4 w-80 min-h-[60vh] bg-white border-t-8 ${color}`}
      onDrop={(e) => {
        if (!onDropTask) return;
        e.preventDefault();
        const taskId = Number(e.dataTransfer.getData("text/plain"));
        onDropTask(taskId);
      }}
      onDragOver={(e) => {
        if (!onDragOverTask) return;
        e.preventDefault();
        onDragOverTask(e);
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {onAddTask && (
          <button
            onClick={onAddTask}
            className="bg-sky-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-sky-700 cursor-pointer"
            title="Adicionar tarefa"
          >
            +
          </button>
        )}
      </div>
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
        {children || (
          <span className="text-gray-400 text-sm text-center mt-2">
            Sem tarefas
          </span>
        )}
      </div>
    </section>
  );
}
