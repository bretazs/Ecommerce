const express = require('express');
const produtoController = require('../controllers/ProdutoController');
const router = express.Router();

router.post("/", produtoController.createProdutos);
router.get("/", produtoController.getAllProdutos);
router.put("/:id", produtoController.updateProduto);
router.delete("/:id", produtoController.deleteProduto);

module.exports = router