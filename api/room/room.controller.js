const roomService = require('./room.service.js');
const logger = require('../../service/logger.service');

// GET ROOM LIST

async function getRooms(req, res) {
    try {
        var filterBy = {
            destination: req.query?.destination || '',
            roomType: req.query?.roomType || '',
            minPrice: +req.query?.minPrice || 0,
            maxPrice: +req.query?.maxPrice || 10000,
        };
        console.log('get rooms inline 11 :>>', filterBy);
        const rooms = await roomService.query(filterBy);
        // console.log('success inline 12 room controler');
        res.json(rooms);
    } catch (err) {
        logger.error('Failed to get rooms', err);
        res.status(500).send({ err: 'Failed to get rooms' });
    }
}

// single room by id
async function getRoomById(req, res) {
    try {
        const roomId = req.params.id;
        const room = await roomService.getById(roomId);
        res.json(room);
    } catch (err) {
        logger.error('Failed to get room', err);
        res.status(500).send({ err: 'Failed to get room' });
    }
}


module.exports = {
    getRooms,
    getRoomById,
    // addRoom,
    // updateRoom,
    // removeRoom
};