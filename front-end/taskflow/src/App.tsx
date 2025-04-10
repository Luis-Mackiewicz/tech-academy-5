import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import About from "./pages/About";
import CreateProject from "./pages/CreateProject";
import Home from "./pages/Home";
import Kanban from "./pages/Kanban";
import Autentication from "./pages/Autentication";
import Members from "./pages/Members";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import Settings from "./pages/Settings";
import PrivateRoute from "./PrivateRoute";

function App() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Rotas que USAM o Layout */}
          <Route element={<Layout />}>
            {/* Rotas públicas dentro do Layout */}
            <Route path="/" element={<Home />} />{" "}
            {/* Home agora dentro do Layout */}
            <Route path="/about" element={<About />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects"
              element={
                <PrivateRoute>
                  <Projects />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
            {/* Rotas aninhadas protegidas DENTRO do Layout */}
            <Route path="/projects">
              <Route
                path="create"
                element={
                  <PrivateRoute>
                    <CreateProject />
                  </PrivateRoute>
                }
              />
              <Route
                path=":id/kanban"
                element={
                  <PrivateRoute>
                    <Kanban />
                  </PrivateRoute>
                }
              />
              <Route
                path=":id/members"
                element={
                  <PrivateRoute>
                    <Members />
                  </PrivateRoute>
                }
              />
            </Route>
          </Route>
          {/* Rotas que NÃO USAM o Layout */}
          <Route path="/authentication" element={<Autentication />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />{" "}
          {/* Mantenha o fallback fora do Layout */}
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
