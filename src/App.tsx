import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useRoutes } from "react-router-dom";
import { Home } from "./pages/Home";

function App() {
  const location = useLocation();
  const element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/projects", element: <Home /> },
  ]);

  return (
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
  );
}

export default App;
