import Header from "@/components/ui/header";

export default function About() {
  return (
    <>
      <main className="flex flex-col min-h-screen bg-gradient-to-t from-sky-400 to-sky-700">
        <Header />
        <div className="flex flex-row flex-1 items-center justify-center px-8 gap-16">
          <div className="flex-1 flex flex-col items-center justify-center mx-8">
            <h1 className="text-white text-2xl font-black mb-6 text-center max-w-2xl">
              TaskFlow é uma plataforma intuitiva e colaborativa para
              gerenciamento de tarefas, projetos e equipes. Criada para otimizar
              fluxos de trabalho, a ferramenta permite que grupos organizem suas
              atividades em quadros kanban dinâmicos, acompanhem o progresso em
              tempo real e distribuam responsabilidades de forma eficiente.
            </h1>
          </div>
        </div>
      </main>
    </>
  );
}
