const  models  = require('../models');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


//cambiar nombre del metodo login
exports.signin = async(req, res, next) =>{
    try {
        const user = await models.user.findOne({ where:{ email: req.body.email } });
        if(user){
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password) //contraseña no encriptada, contraseña encriptada
            if (passwordIsValid) {
                const token = jwt.sign({ 
                    id: user.id,
                    // nombre : user.nombre,
                    nombre : user.name,
                    // rol: user.rol,
                    email: user.email
                }, 'hola soy una cadena secreta' ,{
                    expiresIn: 86400
                });

                res.status(200).send({
                    auth: true, accessToken: token, user: user

                });

                //Linea agregada
                //res.status(200).send({ auth: true, accessToken: token });

            }else{

                res.status(401).json({
                    error: 'Error en la validación correo'
                });

                //Linea agregada: Requerimiento
                //res.status(401);

                //Linea agregada: Requerimiento 
                //res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
                    
            }
        }else{
            res.status(404).json({
                error: 'Error en la validación 2 contraseña'
            });

            //Linea agregada:Requerimiento
            //res.status(404);

            //res.status(404).send('User Not Found.');
        }



    } catch (error) {
        res.status(500).send({
            message: 'Error!!!'
        });

        next(error);
    }
};



/*exports.login = async(req, res, next) =>{
     try {
        // const user = await Usuario.findByEmailAndUpdate({ where:{ email: req.body.email }}, { nombre : req.body.nombre });

     } catch (error) {

         next(error);
     }
 };*/