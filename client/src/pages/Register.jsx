import React, { useState } from "react";
import api from "../../services/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    let formErrors = false;
    if (username.length === 0 || email.length === 0 || password.length === 0) {
      formErrors = true;
      alert("Preencha todos os campos antes de continuar.");
    }
    if (formErrors) return;

    try {
      const response = await api.post("/users", {
        username,
        email,
        password,
      });
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-200">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-extrabold text-center text-orange-600 mb-6">
          Crie sua conta
        </h2>
        <form className="space-y-6" onSubmit={handleRegister}>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Digite seu nome completo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 placeholder-gray-400 text-sm"
            />
          </div>
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
              placeholder="Crie uma senha segura"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 placeholder-gray-400 text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white text-lg font-semibold py-3 rounded-full hover:bg-orange-600 transition focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Registrar
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Já tem uma conta?{" "}
          <a
            href="/login"
            className="text-orange-600 font-medium hover:underline"
          >
            Faça login
          </a>
        </p>
      </div>
    </div>
  );
}
