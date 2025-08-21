import { Routes, Route, NavLink} from "react-router-dom";
import Dashboard from "./pages/Dahboard";
import Camera from "./pages/CameraLandscape";
import ChooseFrame from "./pages/ChooseFrame";
import CameraLandscape from "./pages/CameraLandscape";
import CameraPotrait from "./pages/CameraPotrait";

function App() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
      isActive
        ? "bg-white text-blue-600 shadow-md"
        : "text-white hover:bg-blue-200 hover:text-blue-700"
    }`;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-white">Volab.id</h1>
        <div className="flex gap-4">
          <NavLink to="/" end className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/choose-frame" end className={navLinkClass}>
            Camera
          </NavLink>

        </div>
      </nav>

      {/* Halaman */}
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/choose-frame" element={<ChooseFrame />} />
          <Route path="/camera-landscape" element={<CameraLandscape />} />
          <Route path="/camera-potrait" element={<CameraPotrait />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
