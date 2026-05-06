import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Camiones from "./pages/Camiones";
import Viajes from "./pages/Viajes";
import Conductores from "./pages/Conductores";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/camiones" element={<Camiones />} />
          <Route path="/viajes" element={<Viajes />} />
          <Route path="/conductores" element={<Conductores />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;