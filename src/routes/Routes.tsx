import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Auth />,
        errorElement: <NotFound />,
      },
    ],
  },
]);
