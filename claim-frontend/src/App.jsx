import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Form from "./pages/Form";
import ClaimDetails from "./pages/ClaimDetails";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN (OPEN) */}
        <Route path="/" element={<Login />} />

        {/* PROTECTED ROUTES */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/form" element={
          <ProtectedRoute>
            <Form />
          </ProtectedRoute>
        } />

        <Route path="/claim/:id" element={
          <ProtectedRoute>
            <ClaimDetails />
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;