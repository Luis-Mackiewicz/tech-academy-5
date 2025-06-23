import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import Tutorial from "@/pages/Tutorial";
import Projects from "@/pages/Projects";
// import Register from "@/pages/Register";

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "tutorial",
        element: <Tutorial />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
    ],
  },
]);
