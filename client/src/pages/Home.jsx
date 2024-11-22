import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../../services/axios";
import { useCart } from "../context/CartContext";
import { FaRegPlusSquare } from "react-icons/fa";



export default function Home() {

  const [produtos, setProdutos] = useState([])
  const { addBookToCart } = useCart();
  useEffect(() => {
    const buscarProdutos = async () => {
      const response = await api.get('/produto')
      console.log(response.data)
      setProdutos(response.data)
    };
    buscarProdutos();
  }, [])


  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6 font-poppins">
        <h1 className="text-3xl font-bold text-center mb-6 text-orange-500">
          Nossos produtos
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-transform transform hover:scale-105"
            >
              <div className="relative">
                <img
                  src={produto.imagemUrl}
                  alt={produto.nome}
                  className="h-40 w-full object-cover"
                />
                <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold rounded-full px-2 py-1">
                  Novo
                </span>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-gray-800">{produto.nome}</h2>
                <p className="text-sm text-gray-500 mt-2 mb-4 line-clamp-2">
                  {produto.descricao}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <p className="text-lg font-bold text-green-600">{`R$ ${(produto.preco).toFixed(2)}`}</p>
                  <button
                    onClick={() => addBookToCart(produto)}
                    className="bg-orange-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-orange-500 transition"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}
