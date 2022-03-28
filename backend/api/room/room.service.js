const dbService = require('../../service/db.service')
const logger = require('../../service/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        const criteria = {}
        // todo criteria function
        
        const collection = await dbService.getCollection('room')
        var toys =  await collection.find(criteria).toArray()
        return toys
    } catch (err) {
        logger.error('cannot find rooms', err)
        throw err
    }
}

async function getById(roomId) {
    try {
        const collection = await dbService.getCollection('room')
        const room = await collection.findOne({ '_id': roomId })
        // const room = await collection.findOne({'_id': ObjectId(roomId) })
        console.log(room);
        return room
    } catch (err) {
        logger.error('cannot find room', err)
        throw err
    }
}

module.exports = {
    // remove,
    query,
    getById,
    // add,
    // update,
}