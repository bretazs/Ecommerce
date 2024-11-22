import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from '../pages/Login'
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import { CartProvider } from "../context/CartContext";
import Admin from "../pages/Admin";

const AppRoutes = () => {
    return (
        <CartProvider>
            <Routes>
                {/* Rotas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/cadastrar" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/carrinho" element={<Cart />} />
                <Route path="/pedidos" element={<Orders />} />
                {/* Rotas protegidas */}
                <Route path="/dashboard" element={<Admin />} />

            </Routes>
        </CartProvider>

    )
}

export default AppRoutes;