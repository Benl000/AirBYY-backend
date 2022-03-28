const roomService = require('./room.service.js')
const logger = require('../../service/logger.service')

// GET ROOM LIST

async function getRooms(req,res){
    try {
        var queryParams = req.query;
        const rooms = await roomService.query(queryParams)
        res.json(rooms)
    } catch (err) {
        logger.error('Failed to get rooms', err)
        res.status(500).send({ err: 'Failed to get rooms' })
    }
}

// single room by id
async function getRoomById(req, res){
    try {
        const roomId = req.params.id;
        const room = await roomService.getById(roomId)
        res.json(room)
    } catch (err) {
        logger.error('Failed to get room', err)
        res.status(500).send({ err: 'Failed to get room' })
    }
}


module.exports = {
    getRooms,
    getRoomById,
    // getRoomById,
    // addRoom,
    // updateRoom,
    // removeRoom
  }