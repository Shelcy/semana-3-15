const router = require('express').Router();
const  models  = require('../../models');
const bcrypt = require('bcryptjs');
const usuarioController = require('../../controllers/UserController')


//.com/api/usuario

//api/user/listar
router.get('/', async(req, res) =>{
    const users = await models.user.findAll();
    res.status(200).json(users);
    // res.status(200).json(user);
});

//api/usuario/register
router.post('/register', async(req, res) => {
    req.body.password = bcrypt.hashSync( req.body.password, 10);
    const users = await models.user.create(req.body);
    res.status(200).json(users);
    // res.status(200).json(user);
});


//api/usuario/Login
router.post('/signin', usuarioController.signin);
// router.post('/actualizar', usuarioController.actualizar);


module.exports = router;

