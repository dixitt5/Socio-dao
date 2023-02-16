import logo from "./logo.svg";
import "./App.css";
import HeaderPage from "./Components/HeaderPage";
import Voting from "./Components/Voting";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Marketplace from "./Components/Marketplace";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeaderPage />} />
        <Route path="/voting" element={<Voting />} />
        <Route path="/market" element={<Marketplace />} />
      </Routes>
    </Router>
  );
}

export default App;
