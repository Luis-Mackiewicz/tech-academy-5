import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router";
import KanbanTable from "./KanbanTable";
import KanbanTaskCard from "./KanbanTaskCard";

export type Task = {
  id: number;
  titulo: string;
  descricao: string;
  responsavel: string;
};

export type KanbanState = {
  todo: Task[];
  doing: Task[];
  done: Task[];
};

export default function Kanban() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [tasks, setTasks] = useState<KanbanState>(() => {
    const saved = localStorage.getItem(`kanbanTasks_${projectId}`);
    return saved ? JSON.parse(saved) : { todo: [], doing: [], done: [] };
  });

  useEffect(() => {
    localStorage.setItem(`kanbanTasks_${projectId}`, JSON.stringify(tasks));
  }, [tasks, projectId]);

  const addTask = (col: keyof KanbanState) => {
    const members = JSON.parse(
      localStorage.getItem(`projectMembers_${projectId}`) || "[]"
    );
    const titulo = prompt("Título da tarefa:");
    const descricao = prompt("Descrição da tarefa:");
    const responsavel = prompt(
      "Responsável (email):",
      members[0]?.email || ""
    );
    if (titulo && responsavel) {
      setTasks((prev) => ({
        ...prev,
        [col]: [
          ...prev[col],
          { id: Date.now(), titulo, descricao: descricao || "", responsavel },
        ],
      }));
    }
  };

  const removeTask = (col: keyof KanbanState, id: number) => {
    setTasks((prev) => ({
      ...prev,
      [col]: prev[col].filter((task) => task.id !== id),
    }));
  };

  const editTask = (col: keyof KanbanState, id: number) => {
    const titulo = prompt("Novo título:");
    const descricao = prompt("Nova descrição:");
    setTasks((prev) => ({
      ...prev,
      [col]: prev[col].map((task) =>
        task.id === id
          ? {
              ...task,
              titulo: titulo || task.titulo,
              descricao: descricao || task.descricao,
            }
          : task
      ),
    }));
  };

  const moveTask = (
    from: keyof KanbanState,
    to: keyof KanbanState,
    id: number
  ) => {
    setTasks((prev) => {
      const taskToMove = prev[from].find((t) => t.id === id);
      if (!taskToMove) return prev;
      return {
        ...prev,
        [from]: prev[from].filter((t) => t.id !== id),
        [to]: [...prev[to], taskToMove],
      };
    });
  };

  return (
    <main className="min-h-screen w-screen bg-gradient-to-t from-sky-400 to-sky-700 flex flex-col">
      <header className="flex justify-between items-center p-6 w-[60%] ml-auto mr-auto">
        <Button
          onClick={() => navigate("/projects")}
          className="cursor-pointer bg-sky-950"
        >
          <img src="/public/arrow-left.svg" alt="back" />
        </Button>
        <Button className="bg-sky-950 cursor-pointer">
          <img src="/public/config.svg" alt="config" />
        </Button>
        <Button
          onClick={() => navigate("/membership")}
          className="bg-sky-500 hover:bg-sky-700 text-white text-xs px-3 py-1 ml-2"
        >
          Ver membros
        </Button>
      </header>

      <section className="flex gap-6 p-6 mx-auto min-w-fit">
        <KanbanTable
          title="To Do"
          color="border-sky-500"
          onAddTask={() => addTask("todo")}
        >
          {tasks.todo.map((task) => (
            <KanbanTaskCard
              key={task.id}
              titulo={task.titulo}
              descricao={task.descricao}
              onEdit={() => editTask("todo", task.id)}
              onDelete={() => removeTask("todo", task.id)}
              onMoveRight={() => moveTask("todo", "doing", task.id)}
              canMoveRight
            />
          ))}
        </KanbanTable>

        <KanbanTable
          title="Doing"
          color="border-yellow-400"
          onAddTask={() => addTask("doing")}
        >
          {tasks.doing.map((task) => (
            <KanbanTaskCard
              key={task.id}
              titulo={task.titulo}
              descricao={task.descricao}
              onEdit={() => editTask("doing", task.id)}
              onDelete={() => removeTask("doing", task.id)}
              onMoveLeft={() => moveTask("doing", "todo", task.id)}
              onMoveRight={() => moveTask("doing", "done", task.id)}
              canMoveLeft
              canMoveRight
            />
          ))}
        </KanbanTable>

        <KanbanTable
          title="Done"
          color="border-green-500"
          onAddTask={() => addTask("done")}
        >
          {tasks.done.map((task) => (
            <KanbanTaskCard
              key={task.id}
              titulo={task.titulo}
              descricao={task.descricao}
              onEdit={() => editTask("done", task.id)}
              onDelete={() => removeTask("done", task.id)}
              onMoveLeft={() => moveTask("done", "doing", task.id)}
              canMoveLeft
            />
          ))}
        </KanbanTable>
      </section>
    </main>
  );
}
