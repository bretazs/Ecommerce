const { Category, Product } = require("../../models");

class CategoriaController {
    async createCategoria(req, res) {
        try {
            const novaCategoria = req.body;
            const { nome } = novaCategoria;
            const categoria = await Category.create({
                nome,
            });
            res.status(201).json(categoria);
        } catch (error) {
            res.status(500).json({ erro: "Erro ao criar a categoria de produtos!" })
            console.error(error)
        }
    }
    async getAllCategorias(req, res) {
        try {
            const categorias = await Category.findAll();
            res.status(200).json(categorias);
        } catch (error) {
            res.status(500).json({ erro: "Erro ao listar todas as categorias." });
            console.error(error)
        }
    }
    async getCategoriaById(req, res) {
        try {
            const categoria = await Category.findByPk(req.params.id);
            if (!categoria) {
                return res.status(404).json({ erro: "categoria não foi encontrada" });
            }
            res.status(200).json(categoria);
        } catch (error) {
            res.status(500).json({ erro: "Erro ao mostrar a categoria." });
            console.error(error)
        }
    }

    async deleteCategoria(req, res) {
        try {
            const categoria = await Category.findByPk(req.params.id);
            if (!categoria) {
                return res.status(404).json({ erro: "Categoria não encontrada" });
            }
            await categoria.destroy();
            res.status(200).json({ message: "Categoria excluida com sucesso." });
        } catch (error) {
            res.status(500).json({ erro: "Erro ao excluir a categoria." });
            console.error(error)
        }
    }
}

module.exports = new CategoriaController();