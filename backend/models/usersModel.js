const mongoose = require ('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Hija ingresa tu nombre"]
    },
    email: {
        type: String,
        required: [true, "Hija ingresa algun email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Hija ingresa una contraseña"]
    },
    esAdmin:{
        type: Boolean,
        default: false
    },
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)