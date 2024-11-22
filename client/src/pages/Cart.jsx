import React from "react";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import api from "../../services/axios";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const { cartItems, removeItemFromCart, clearCartItems } =
    useCart();
  const { user } = useAuth();
  const total = cartItems.reduce(
    (sum, item) => sum + item.preco * item.quantity,
    0
  );
  /*
  const mockUser = {
   nome: "samuel",
   id: 2, 
   role: "admin"
  }
  */

  const handleCompra = async () => {
    const orderPayload = {
      user_id: user.id,
      produtos: cartItems.map((item) => ({
        product_id: item.id,
        quantidade: item.quantity,
      })),
    };
    try {
      await api.post("/pedido", orderPayload);
      clearCartItems();
      alert("Compra realizada com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao realizar a compra. Tente novamente.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-6">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-orange-600">
          Carrinho de Compras
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white shadow-lg rounded-3xl p-6">
            {cartItems.length === 0 ? (
              <div className="flex items-center justify-center">
                <p className="text-center text-gray-500">
                  Seu carrinho está vazio.
                </p>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center"
                    >
                      <img
                        src={item.imagemUrl}
                        alt={item.nome}
                        className="h-32 w-32 object-cover mb-4 rounded-lg"
                      />
                      <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
                        {item.name}
                      </h2>
                      <p className="text-lg text-gray-600">{`R$ ${item.preco}`}</p>
                      <p className="text-sm text-gray-400">
                        Quantidade: {item.quantity}
                      </p>
                      <button
                        onClick={() => removeItemFromCart(item.id)}
                        className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition"
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <button
                    onClick={clearCartItems}
                    className="mt-4 bg-orange-500 text-white py-3 px-6 rounded-full hover:bg-orange-600 transition"
                  >
                    Limpar Carrinho
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white shadow-lg rounded-3xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Resumo do Pedido
            </h2>
            <div className="flex justify-between text-lg mb-4">
              <span>Subtotal:</span>
              <span className="font-semibold">R$ {total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-orange-600">
              <span>Total:</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCompra}
              className="w-full bg-orange-500 text-white py-3 rounded-full mt-6 hover:bg-orange-600 transition"
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
