const asyncHandler = require('express-async-handler')
const Tarea = require('../models/tareasModel')

const getTareas = asyncHandler(async ( req, res) => {
    const tareas = await Tarea.find({user: req.user.id})
res.status(200).json(tareas)

})

const createTareas =asyncHandler( async (req, res) => {
    if (!req.body.descripcion){
        res.status(400)
       throw new Error ('Porfa hija tecla la descripcion')
    }

    const tarea = await Tarea.create({
        descripcion: req.body.descripcion,
        user: req.user.id
    })

    res.status(201).json(tarea)

})

const updateTareas = asyncHandler( async (req, res) => {

    const tarea = await Tarea.findById(req.params.id)

    if(!tarea) {
        res.status(400)
        throw new Error ('Hija esa tarea no existe')
    }

    
    res.status(200).json({mensaje: `Modificar la tarea con id ${req.params.id}`})
})

const deleteTareas = asyncHandler( async(req, res) => {
  
    const tarea = await Tarea.findById(req.params.id)

    if (!tarea) {
        res.status(400)
        throw new Error('Esa tarea no existe')
    }

    await Tarea.deleteOne(tarea)
    //const tareaDeleted = await Tarea.findByIdAndDelete(req.params.id)

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getTareas,
    createTareas,
    updateTareas,
    deleteTareas
}