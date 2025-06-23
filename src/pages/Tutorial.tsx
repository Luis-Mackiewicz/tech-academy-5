import Header from "@/components/Header";

export default function Tutorial() {
  return (
    <>
      <main className="flex flex-col min-h-screen bg-gradient-to-t from-sky-400 to-sky-700">
        <Header />
        <div className="flex flex-row flex-1 items-center justify-center px-8 gap-16">
          <div className="flex-1 flex flex-col items-center justify-center">
            <h1 className="text-white font-black text-4xl mb-6 text-center">
              Tutorial
            </h1>
            <p className="text-white text-lg text-center max-w-md font-medium">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
              voluptate nobis molestiae inventore enim rem possimus, odit ullam,
              libero aliquid iure quaerat nesciunt alias? Ipsum voluptatum modi
              asperiores aliquid nostrum!
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
