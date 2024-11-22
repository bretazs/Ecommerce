const { Product } = require("../../models");

class ProdutoController {
    async createProdutos(req, res) {
        try {
            const novoProduto = req.body;
            const { nome, descricao, preco, quantidadeEstoque, imagemUrl, category_id } = novoProduto;
            const produto = await Product.create({
                nome,
                descricao,
                preco,
                quantidadeEstoque,
                imagemUrl,
                category_id
            });
            res.status(201).json(produto);
        } catch (error) {
            console.log(error);
            res.status(500).json({ erro: "Erro ao criar o produto" });
        }
    }
    async getAllProdutos(req, res) {
        try {
            const produtos = await Product.findAll();
            res.status(200).json(produtos);
        } catch (error) {
            console.log(error);
            res.status(500).json({ erro: "Erro ao listar os produtos" });
        }
    }
    async updateProduto(req, res) {
        try {
            const produto = await Product.findByPk(req.params.id);
            if (!produto) {
                return res.status(404).json({ erro: "Produto não encontrado" });
            }
            const newData = await produto.update(req.body);
            const { nome, descricao, preco, quantidadeEstoque, imagemUrl, category_id } = newData;
            res.status(200).json({ nome, descricao, preco, quantidadeEstoque, imagemUrl, category_id });
        } catch (error) {
            console.log(error)
            res.status(500).json({ erro: "Erro ao editar o produto" });
        }
    }
    async deleteProduto(req, res) {
        try {
            const produto = await Product.findByPk(req.params.id);
            if (!produto) {
                return res.status(500).json({ erro: "Produto não encontrado" });
            }
            await produto.destroy()
            res.status(200).json({ message: "Produto deletado com sucesso" });
        } catch (error) {
            console.log(error)
            res.status(500).json({ erro: "Erro ao deletar produto" });
        }

    }
}

module.exports = new ProdutoController();