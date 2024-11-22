const express = require('express');
const PedidoController = require('../controllers/PedidoController');
const router = express.Router();

router.post('/', PedidoController.createPedido);
router.get('/', PedidoController.getAllPedidos);
router.get('/:id', PedidoController.getPedidoById);
router.get('/user/:user_id', PedidoController.getUserPedidos);
module.exports = router;