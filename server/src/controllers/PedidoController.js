const { Order, OrderProduct, Product } = require('../../models');

class OrderController {
    async createPedido(req, res) {
        try {
            const { user_id, produtos } = req.body;
            let total = 0;
            const pedido = await Order.create({ user_id, total: 0 });

            for (const produto of produtos) {
                const produtoEncontrado = await Product.findByPk(produto.product_id);
                if (!produtoEncontrado) {
                    return res.status(404).json({ erro: "Produto nao encontrado" });
                }

                const itemTotal = produtoEncontrado.preco * produto.quantidade;
                total += itemTotal;

                await OrderProduct.create({
                    order_id: pedido.id,
                    product_id: produtoEncontrado.id,
                    preco: produtoEncontrado.preco,
                    quantidade: produto.quantidade
                });
            }
            await pedido.update({ total });
            return res.status(201).json({
                status: 201,
                message: "Pedido criado com sucesso.",
                pedido
            });
        } catch (error) {
            console.error("Erro ao processar o pedido", error);
            return res.status(500).json({ erro: "Erro ao criar o pedido" });
        }
    }

    async getAllPedidos(req, res) {
        try {
            const orders = await Order.findAll({
                include: [
                    {
                        model: OrderProduct,
                        as: 'orderProducts',
                    },
                ],
            });
            return res.status(200).json({ orders });
        } catch (error) {
            console.error('Erro ao listar pedidos:', error);
            return res.status(500).json({ error: 'Erro ao listar os pedidos.' });
        }
    }

    async getUserPedidos(req, res) {
        try {
            const { user_id } = req.params;
            const pedidos = await Order.findAll({
                where: { user_id },
                include: [
                    {
                        model: OrderProduct,
                        as: 'orderProducts',
                    },
                ],
            });

            return res.status(200).json({ pedidos });
        } catch (error) {
            console.error('Erro ao listar pedidos do usuário:', error);
            return res.status(500).json({ error: 'Erro ao listar os pedidos do usuário.' });
        }
    }

    async getPedidoById(req, res) {
        try {
            const { id } = req.params;

            const pedido = await Order.findByPk(id, {
                include: [
                    {
                        model: OrderProduct,
                        as: 'orderProducts',
                    },
                ],
            });

            if (!pedido) {
                return res.status(404).json({ error: 'Pedido não encontrado.' });
            }

            return res.status(200).json({ pedido });
        } catch (error) {
            console.error('Erro ao obter pedido:', error);
            return res.status(500).json({ error: 'Erro ao buscar o pedido.' });
        }
    }
    async updatePedido(req, res) {
        try {
            const { id } = req.params;

            const pedido = await Order.findByPk(id);
            if (!pedido) {
                return res.status(404).json({ error: 'Pedido não encontrado.' });
            }

            const pedidoEditado = await pedido.update(req.body);

            return res.status(200).json({
                status: 200,
                message: 'Pedido atualizado com sucesso.',
                order: pedidoEditado,
            });
        } catch (error) {
            console.error('Erro ao atualizar pedido:', error);
            return res.status(500).json({ error: 'Erro ao atualizar o pedido.' });
        }
    }
}


module.exports = new OrderController();