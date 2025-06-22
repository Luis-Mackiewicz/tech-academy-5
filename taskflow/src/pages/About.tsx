import imageTasks from "../assets/ImageTasks.jpg";
import InfoContainer from "../components/InfoContainer";
import { useEffect } from "react";

function About() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <section className="flex items-center justify-center h-screen w-screen overflow-hidden">
      <InfoContainer />

      <div className="w-[42vw] h-[45vh] flex items-center justify-center ml-[5%] mr-[5%]">
        <img
          src={imageTasks}
          alt="Tarefas Kanban"
          className="h-full w-full object-cover rounded-lg shadow-lg border border-black transition-transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1"
        />
      </div>
    </section>
  );
}

export default About;
