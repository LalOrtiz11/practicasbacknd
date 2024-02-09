const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const User = require ('../models/usersModel')

const crearUser = asyncHandler(async(req, res) => {

    //desestructuramos el body
    const { name,email, password } = req.body

    // verficamos que nos pasen los datos necesarios para crerar el usuario
    if (!name || !email || !password){
        res.status(400)
        throw new Error('Hija faltan datos')
    }
    //Verificamos que el email del usuario no exista

    const userExiste = await User.findOne({email})
    if (userExiste){
        res.status(400)
        throw new Error('Hija el usuario ya existe')
    }
//Hacemos el HASH al paswword
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password,salt)

//Crear al usuario
const user = await User.create({
    name,
    email,
    password: hashedPassword
})
if(user){
    res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email
    })
}else{
    res.status(400)
    throw new Error ('Lo siento hija no se pudo guardar los datos')
}
    //res.status(201).json({message: 'Crear Usuario'})
})

const loginUser = asyncHandler(async (req, res)=>{
    const { email, password } = req.body
    //verificar que exista un usuario con este email
    const user = await User.findOne({email})
    //si el usuario existe verificamos tambien el password
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generarToken(user.id)
            
        })
    }else {
        res.status(400)
        throw new Error('Hija la contraseña es  incorrectas')
    }
})
const datosUser = asyncHandler(async(req, res) => {
    res.status(201).json({message: 'Datos del Usuario'})
})

//funcion para generar el token
const generarToken =(id_usuario) => {
    return jwt.sign({id_usuario},process.env.JWT_SECRET,{
        expiresIn: '60m'
    })
}

module.exports= {
     crearUser,
     loginUser, 
     datosUser
    }