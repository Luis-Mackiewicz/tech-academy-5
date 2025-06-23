import Header from "@/components/Header";

export default function Home() {
  const kanbanImage = "/public/kanban.png";

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-t from-sky-400 to-sky-700">
      <Header />
      <div className="flex flex-row flex-1 items-center justify-center px-8 gap-16">
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-white font-black text-4xl mb-6 text-center">
            Bem vindo ao Taskflow
          </h1>
          <p className="text-white text-lg text-center max-w-md font-medium">
            No mundo dinâmico de hoje, produtividade é mais do que fazer mais em
            menos tempo, é sobre foco, organização e fluxo contínuo de trabalho.
            O TaskFlow foi criado para transformar sua rotina com um sistema
            visual de Kanban intuitivo, flexível e eficiente.
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <img
            src={kanbanImage}
            alt="Kanban"
            className="max-w-xs w-full rounded-xl"
          />
        </div>
      </div>
    </main>
  );
}
