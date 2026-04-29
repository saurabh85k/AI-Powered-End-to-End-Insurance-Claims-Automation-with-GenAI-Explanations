import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Form from "./pages/Form";
import ClaimDetails from "./pages/ClaimDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Routes>
          {/* LOGIN AND REGISTER (OPEN) */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

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
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;