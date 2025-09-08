import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./component/navbar/navbar";
import Home from "./pages/home";
import Games from "./pages/games";
import Login from "./pages/login";
import About from "./pages/about";
import Chart from "./pages/chart";
import ChemistryLab from "./component/ChemistryLab/ChemistryLab";
import Lab3D from "./pages/lab3d";
import BiologyLab from "./component/BiologyLab/BiologyLab";
import BiologyToolViewer from "./component/BiologyLab/BiologyToolViewer";
import SimulationPage from "./component/PhysicsLab/SimulationPage";
import PhysicsLab from "./component/PhysicsLab/PhysicsLab";
import ChemistrySimulationPage from "./component/ChemistryLab/ChemistrySimulationPage";
import Ani from "./pages/Animate";
import GameSector from "./component/Games/GameSector";


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/3dlab" element={<Lab3D />} />
          <Route path="/3danimation" element={<Ani />} />
          <Route path="/games" element={<Games />} />
          <Route path="/chat" element={<Chart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/lab/physics" element={<PhysicsLab />} />
<Route path="/lab/chemistry" element={<ChemistryLab />} />
<Route path="/lab/biology" element={<BiologyLab />} />
<Route path="/lab/biology/:toolId" element={<BiologyToolViewer />} />
 <Route path="/lab/physics/:title" element={<SimulationPage />} />
  <Route path="/lab/chemistry/:title" element={<ChemistrySimulationPage />} />
    <Route path="/games/:sector" element={<GameSector />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
