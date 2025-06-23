import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Authentication from "@/pages/Authentication";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Authentication />,
        errorElement: <NotFound />,
      },
    ],
  },
]);
