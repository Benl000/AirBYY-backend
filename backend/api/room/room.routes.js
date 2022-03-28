const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
// const { getRooms, getToyById, addToy, updateToy, removeToy, addReview } = require('./room.controller')
const { getRooms ,getRoomById} = require('./room.controller')
const router = express.Router()

router.get('/', log, getRooms)
router.get('/:id', getRoomById)

module.exports = router