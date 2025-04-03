import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import About from "./pages/About";
import CreateProject from "./pages/CreateProject";
import Home from "./pages/Home";
import Kanban from "./pages/Kanban";
import Login from "./pages/Login";
import Members from "./pages/Members";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import Settings from "./pages/Settings";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />

        {/* Rotas com layout comum (usando Layout com Outlet) */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />

          {/* Rotas aninhadas para projetos */}
          <Route path="/projects">
            <Route path="create" element={<CreateProject />} />
            <Route path=":id/kanban" element={<Kanban />} />
            <Route path=":id/members" element={<Members />} />
          </Route>
        </Route>

        {/* Rota de fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
