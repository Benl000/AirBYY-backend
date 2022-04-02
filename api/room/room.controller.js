const roomService = require('./room.service.js');
const logger = require('../../service/logger.service');

// GET ROOM LIST

async function getRooms(req, res) {
    let roomType = setRoomType(JSON.parse(req.query.roomType))
    try {
        var filterBy = {
            destination: req.query?.destination || '',
            minPrice: +req.query?.minPrice || 0,
            maxPrice: +req.query?.maxPrice || 10000,
            roomType,
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

function setRoomType(roomType) {
    console.log('room type line 41 :>>' , roomType);
    const roomTypeRes = []
    if(roomType.entirePlace) roomTypeRes.push("Entire home/apt")
    if(roomType.privateRoom) roomTypeRes.push("Private room")
    if(roomType.hotelRoom) roomTypeRes.push(roomType.hotelRoom)
    if(roomType.sharedRoom) roomTypeRes.push(roomType.sharedRoom)
    
    console.log('room type line 49 :>>' , roomTypeRes);
    return roomTypeRes
}


module.exports = {
    getRooms,
    getRoomById,
    // addRoom,
    // updateRoom,
    // removeRoom
};