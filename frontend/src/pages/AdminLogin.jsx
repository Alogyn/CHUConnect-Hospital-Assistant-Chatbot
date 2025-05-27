import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AdminLogin() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post('/api/auth/login/', { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch (e) {
      setError("Login ou mot de passe incorrect.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h2 className="text-2xl mb-6">{t('login')}</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-96 bg-white p-6 rounded-lg shadow">
        <input className="border p-2 rounded" type="email" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} required />
        <input className="border p-2 rounded" type="password" value={password} placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-800 transition">Connexion</button>
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
}
