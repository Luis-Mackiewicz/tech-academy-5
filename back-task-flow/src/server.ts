import "reflect-metadata";
import { AppDataSource } from "./data-source";
import app from "./app";

const PORT = process.env.PORT || 3333;

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
