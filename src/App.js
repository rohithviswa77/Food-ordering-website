import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import QrScan from "./pages/QrScan";
import ConfirmTable from "./pages/ConfirmTable";
import Menu from "./pages/Menu"; // We'll create this next

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/qr-scan" element={<QrScan />} />
        <Route path="/confirm-table" element={<ConfirmTable />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </Router>
  );
}

export default App;

