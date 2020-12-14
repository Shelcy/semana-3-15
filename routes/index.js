const router = require('express').Router();
const apiUsuarioRouter = require('./api/usuarios');

// Ruta anterior: router.use('/usuario', apiUsuarioRouter);
router.use('/auth', apiUsuarioRouter);
//.com/api/usuario

module.exports = router;

// /api/usuario/login
// /api/usuario/
// /api/usuario/registrar

// /api/articulo/
// /api/articulo/registrar