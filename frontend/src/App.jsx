import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Camiones from "./pages/Camiones";
import Viajes from "./pages/Viajes";
import Conductores from "./pages/Conductores";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Toaster 
        position="top-right" 
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: '14px',
            borderRadius: '12px',
            background: '#1e293b',
            color: '#fff',
            padding: '12px 16px',
          },
          success: {
            duration: 3000,
            theme: { primary: '#22c55e' }
          },
          error: {
            duration: 4000,
            theme: { primary: '#ef4444' }
          }
        }}
      />

      <Navbar />

      <main style={styles.mainContainer}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/camiones" element={<Camiones />} />
          <Route path="/viajes" element={<Viajes />} />
          <Route path="/conductores" element={<Conductores />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </Router>
  );
}

const styles = {
  mainContainer: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: 'calc(100vh - 70px)',
  }
};

export default App;