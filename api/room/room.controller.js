const roomService = require('./room.service.js')
const logger = require('../../service/logger.service')

// GET ROOM LIST

async function getRooms(req,res){
    try {
        var filterBy = {
            destination: req.query?.destination ||'',
            capacity: (+req.query?.adults || 0)+(+req.query?.children||0)+(+req.query?.infants || 0),
            pets: (+req.query?.pets||0)
        }
        console.log('get rooms inline 13 :>>',filterBy);
        const rooms = await roomService.query(filterBy)
        console.log('success inline 12 room controler');
        res.json(rooms.slice(0,10))
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
    // addRoom,
    // updateRoom,
    // removeRoom
  }