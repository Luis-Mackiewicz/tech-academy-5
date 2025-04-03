function InfoContainer() {
  return (
    <section className="bg-[#434848] flex h-[45vh] w-[42vw] ml-[5%] items-center justify-center">
      <div className="text-white text-center px-8">
        <h1 className="text-2xl font-bold">Como Funciona?</h1>
        <p className="mt-4">
          Nosso site utiliza um sistema de organização no estilo{" "}
          <strong>Kanban</strong>. Você pode criar, mover e gerenciar tarefas
          facilmente em colunas que representam diferentes estágios do fluxo de
          trabalho. Ideal para equipes ou organização pessoal, permitindo uma
          visão clara do progresso das suas atividades.
        </p>
      </div>
    </section>
  );
}

export default InfoContainer;
