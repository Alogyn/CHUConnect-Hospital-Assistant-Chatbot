import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LanguageSelect from "./pages/LanguageSelect";
import Home from "./pages/Home";
import ChatbotPage from "./pages/ChatbotPage";
import ServicesList from "./pages/ServicesList";
import TarifsList from "./pages/TarifsList";
import ProceduresPage from "./pages/ProceduresPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LanguageSelect />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/services" element={<ServicesList />} />
        <Route path="/tarifs" element={<TarifsList />} />
        <Route path="/procedures" element={<ProceduresPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App
