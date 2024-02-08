const jwt = require('jsonwebtoken')
const asyncHandler = require ('express-async-handler')
const User = require ('../models/usersModel')

const protect = asyncHandler(async (req, res, next) =>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
// obtenemos el token
token = req.headers.authorization.split(' ')[1]

//verificamos el token atravez de la firma
const decoded = jwt.verify(token, process.env.JWT_SECRET)

//obtener los datos del usuario del token que pase a travez del paidload

req.User = await User.findById(decoded.id_usuario).select('-password')

        } catch (error){
            console.log(error)
            res.status(401)
            throw new Error ('Acceso no autorizado')

        }
    }
    if (!token){
        res.status(401)
            throw new Error ('Acceso no autorizado!, Hija no se paso un token')
    }

})

module.exports = {protect}

