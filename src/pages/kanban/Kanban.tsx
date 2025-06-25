import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import KanbanTable from "./KanbanTable";
import KanbanTaskCard from "./KanbanTaskCard";

type Task = {
  id: number;
  titulo: string;
  descricao: string;
};

type KanbanState = {
  todo: Task[];
  doing: Task[];
  done: Task[];
};

export default function Kanban() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<KanbanState>({
    todo: [],
    doing: [],
    done: [],
  });

  // Função para adicionar uma task (exemplo simples)
  const addTask = (col: keyof KanbanState) => {
    const titulo = prompt("Título da tarefa:");
    const descricao = prompt("Descrição da tarefa:");
    if (titulo) {
      setTasks((prev) => ({
        ...prev,
        [col]: [
          ...prev[col],
          { id: Date.now(), titulo, descricao: descricao || "" },
        ],
      }));
    }
  };

  // Função para remover uma task
  const removeTask = (col: keyof KanbanState, id: number) => {
    setTasks((prev) => ({
      ...prev,
      [col]: prev[col].filter((task) => task.id !== id),
    }));
  };

  // Função para editar uma task
  const editTask = (col: keyof KanbanState, id: number) => {
    const titulo = prompt("Novo título:");
    const descricao = prompt("Nova descrição:");
    setTasks((prev) => ({
      ...prev,
      [col]: prev[col].map((task) =>
        task.id === id
          ? { ...task, titulo: titulo || task.titulo, descricao: descricao || task.descricao }
          : task
      ),
    }));
  };

  const configurationIcon = "/public/config.svg";

  return (
    <main className="h-screen w-screen bg-gradient-to-t from-sky-400 to-sky-700 flex flex-col">
      <header className="flex justify-between items-center p-6">
        <Button onClick={() => navigate("/projects")}>Voltar</Button>
        <Button>
          <img src={configurationIcon} alt="config" />
        </Button>
      </header>
      <section className="flex-1 flex flex-row gap-8 justify-center items-start p-8 overflow-x-auto">
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
            />
          ))}
        </KanbanTable>
      </section>
    </main>
  );
}
