const dbService = require('../../service/db.service')
const logger = require('../../service/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)
        logger.debug('criteria after filter :>>', criteria)
        // const criteria = {}
        // todo criteria function
        const collection = await dbService.getCollection('room')
        var rooms = await collection.find(criteria).toArray()
        // console.log('query inline 12 rooms :>> ' ,rooms);
        return rooms
    } catch (err) {
        logger.error('cannot find rooms', err)
        throw err
    }
}

async function getById(roomId) {
    try {
        const collection = await dbService.getCollection('room')
        // const room = await collection.findOne({ '_id': roomId })
        const room = await collection.findOne({ '_id': ObjectId(roomId) })
        return room
    } catch (err) {
        logger.error('cannot find room', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    var criteria = {}
    console.log(filterBy);

    if (filterBy.destination) {
        const txtCriteria = { $regex: filterBy.destination, $options: 'i' }
        criteria.$or = [
            {
                'address.country': txtCriteria
            },
            {
                'address.city': txtCriteria
            }
            ]
        }
        if(filterBy.capacity) {
            criteria.capacity = {$gte: filterBy.capacity}
        }
        if(filterBy.pets) {
            criteria.houseRules = {$regex: 'pets',$options: 'i'}
        }

        console.log('_buildCriteria inline 48 criteria :>> ', criteria);
    return criteria
}

module.exports = {
    // remove,
    query,
    getById,
    // add,
    // update,
}