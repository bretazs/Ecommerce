const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');
const loginRoutes = require('./src/routes/loginRoutes');
const inicioRoutes = require('./src/routes/inicioRoutes');
const produtoRoutes = require('./src/routes/produtoRoutes')
const categoriaRoutes = require('./src/routes/categoriaRoutes');
const pedidoRoutes = require('./src/routes/pedidoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', inicioRoutes);
app.use('/users', userRoutes);
app.use('/login/', loginRoutes);

app.use('/produto/', produtoRoutes);
app.use('/categoria/', categoriaRoutes);
app.use('/pedido/', pedidoRoutes);
module.exports = app;
