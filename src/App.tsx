import { Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome";
import useAuth from "./hooks/auth-hooks";
import Dashboard from "./pages/Dashboard";

function App() {
  const {} = useAuth();

  return (
    <div className="flex flex-col gap-4 justify-center items-center font-sans bg-white text-gray-900 max-w-7xl mx-auto h-[100vh] p-4">
      <Routes>
        <Route path="/" element={Welcome()} />
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="auth" element={Dashboard()} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
