const express = require('express')
const router = express.Router()
const { getTareas, createTareas, deleteTareas, updateTareas} = require ('../controllers/tareasControllers')

router.get('/', getTareas)

router.post('/',createTareas)

router.put('/:id',updateTareas)

router.delete('/:id',deleteTareas)


module.exports = router