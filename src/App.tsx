import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useRoutes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { NavButton } from "./components/NavButton/NavButton";
import { NavBar } from "./components/NavBar/NavBar";
import { Wall88x31 } from "./pages/Wall88x31";

function App() {
  const location = useLocation();
  const element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/projects", element: <Projects /> },
    { path: "/88x31", element: <Wall88x31 /> },
  ]);

  return (
    <>
      <NavBar>
        <NavButton name="home" to="/" />
        <NavButton name="projects" to="/projects" />
        <NavButton name="88x31" to="/88x31" />
      </NavBar>
      <AnimatePresence mode="wait">
        {element && (
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            {element}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
