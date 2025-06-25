import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import Tutorial from "@/pages/Tutorial";
import Projects from "@/pages/Projects";
import CreateNewProject from "@/pages/CreateNewProject";
import Profile from "@/pages/Profile";
import Kanban from "@/pages/kanban/Kanban";
import Membership from "@/pages/kanban/Membership";
import EditProject from "@/pages/kanban/EditProject";

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
      {
        path: "create-new-project",
        element: <CreateNewProject />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "kanban",
        element: <Kanban />,
      },
      {
        path: "membership",
        element: <Membership />,
      },
      {
        path: "edit-project/:id",
        element: <EditProject />,
      },
    ],
  },
]);
