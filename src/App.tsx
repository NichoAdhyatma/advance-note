import { Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome";
import useAuth from "./hooks/auth-hooks";
import Dashboard from "./pages/Dashboard";

function App() {
  const {} = useAuth();

  return (
    <Routes>
      <Route path="/" element={Welcome()} />
      <Route path="/:id">
        <Route index element={<h1>Show</h1>} />
        <Route path="edit" element={<h1>Edit</h1>} />
      </Route>
      <Route path="/dashboard" element={Dashboard()} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
