import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import api from '../../services/axios';
import { useAuth } from '../context/AuthContext';

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const userId = user?.id

  useEffect(() => {
    if (!userId) return;
    const fetchOrdersByUserId = async () => {
      const response = await api.get(`/pedido/user/${userId}`)
      console.log(response.data);
      setOrders(response.data.pedidos);
      console.log("orders", orders)
    }
    fetchOrdersByUserId();
  }, [userId])

  return (
    <div>
      <Navbar />
      <main className="bg-[#f9fafb] min-h-screen py-10">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold text-[#e26a2c] mb-6 text-center">
            Meus Pedidos
          </h1>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {orders.length === 0 ? (
              <p className="text-center text-gray-500">
                Nenhum pedido encontrado.
              </p>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1"
                >
                  <div className="mb-4 text-center">
                    <h2 className="text-xl font-extrabold text-[#e26a2c]">
                      Pedido #{order.id}
                    </h2>
                    <p
                      className={`text-sm font-semibold mt-2 ${order.status === "PAGO"
                        ? "text-green-600"
                        : order.status === "PENDENTE"
                          ? "text-yellow-600"
                          : "text-red-600"
                        }`}
                    >
                      {order.status === "PAGO"
                        ? "✅ Pagamento Confirmado!"
                        : order.status === "PENDENTE"
                          ? "⚠️ Aguardando Pagamento"
                          : "❌ Cancelado"}
                    </p>
                  </div>
                  <p className="text-center text-gray-600 mb-4">
                    Total:{" "}
                    <span className="font-bold text-[#e26a2c]">
                      R$ {order.total.toFixed(2)}
                    </span>
                  </p>
                  <button className="w-full bg-[#e26a2c] text-white py-3 rounded-full font-bold hover:bg-[#bf4f1c] transition">
                    Ver Detalhes
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
