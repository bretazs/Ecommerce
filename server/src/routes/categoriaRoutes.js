const express = require('express');
const CategoriaController = require('../controllers/CategoriaController');
const router = express.Router();


router.post('/', CategoriaController.createCategoria);
router.get("/", CategoriaController.getAllCategorias);
router.get("/:id", CategoriaController.getCategoriaById);
router.delete("/:id", CategoriaController.deleteCategoria);

module.exports = router;