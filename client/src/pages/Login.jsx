import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    let formErrors = false;
    if (email.length === 0 || password.length === 0) {
      formErrors = true;
      alert("Preencha os campos antes de continuar.");
    }
    if (formErrors) return;

    try {
      const response = await api.post("/login", {
        email,
        password,
      });
      const token = response.data.token;
      const userData = {
        id: response.data.user.id,
        nome: response.data.user.nome,
        email: response.data.user.email,
        role: response.data.user.role,
      };

      login(token, userData);
      alert("Logado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Aconteceu algo inesperado. Por favor, tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-200">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-extrabold text-center text-orange-600 mb-6">
          Faça Login
        </h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="flex flex-col">
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 placeholder-gray-400 text-sm"
            />
          </div>
          <div className="flex flex-col">
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 placeholder-gray-400 text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white text-lg font-semibold py-3 rounded-full hover:bg-orange-600 transition focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Entrar
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Não possui uma conta?{" "}
          <a
            href="/cadastrar"
            className="text-orange-600 font-medium hover:underline"
          >
            Registre-se
          </a>
        </p>
      </div>
    </div>
  );
}
