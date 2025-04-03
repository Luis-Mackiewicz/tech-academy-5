import imageKanban from "../assets/imageKanban.svg";

function Home() {
  return (
    <>
      <main className="flex">
        <div className="justify-between pl-[5%] w-1/2">
          <h1 className="text-[6.25rem] text-[#97D1D2] font-bold pt-[8%]">
            Taskflow
          </h1>
          <h2 className="text-[3rem] text-[#161D1D] pt-[16%]">
            Organize e Gerencie
            <br /> Seus Projetos de TI com <br />
            Facilidade e Eficiência
          </h2>
        </div>
        <div className="w-1/2 flex items-center justify-center pr-[5%]">
          <img
            src={imageKanban}
            alt="Image Kanban"
            className="max-w-full max-h-[80vh] object-contain pt-[8%]"
          />
        </div>
      </main>
    </>
  );
}

export default Home;
