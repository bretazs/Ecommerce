import React from "react";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const { cartItems } = useCart();

  const totalItems = cartItems
    ? cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0)
    : 0;

  return (
    <nav className="bg-orange-500 text-white px-4 py-3 shadow-md font-poppins">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold hover:text-orange-300 transition flex items-center"
        >
          🛒 Mercadinho
        </Link>
        <ul className="flex items-center space-x-6">
          {isLoggedIn && user.role === "admin" && (
            <li>
              <Link
                to="/dashboard"
                className="hover:text-orange-300 transition text-sm"
              >
                Gerenciar
              </Link>
            </li>
          )}

          {isLoggedIn && user.role !== "admin" && (
            <li>
              <Link to="/pedidos" className="hover:text-orange-300 transition flex items-center">
                <FaClipboardList className="h-6 w-6 md:h-8 md:w-8" /> Pedidos
              </Link>
            </li>
          )}

          <li>
            <Link to="/carrinho" className="relative group">
              <BsCart2 className="h-6 w-6 md:h-8 md:w-8 text-white group-hover:text-orange-300 transition" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-1 bg-orange-300 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </li>

          <li>
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="bg-orange-400 shadow-lg text-white py-1 px-3 rounded-md hover:bg-orange-600 hover:shadow-lg transition flex items-center"
              >
                <AiOutlineLogout className="mr-1" /> Sair
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-orange-400 shadow-lg text-white py-1 px-3 rounded-md hover:bg-orange-600 hover:shadow-lg transition flex items-center"
              >
                <AiOutlineLogin className="mr-1" /> Entrar
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
