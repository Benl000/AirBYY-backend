const dbService = require('../../service/db.service')
const logger = require('../../service/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(userId = {}) {
    try {
        const collection = await dbService.getCollection('order');
        var orders = await collection.find({}).toArray();
        console.log('line 8 order service :>>' , orders);
        return orders
        // const orders = await collection.find().toArray()
    //     var userOrders = await collection
    //     .aggregate([
    //         {$match: {"host._id": ObjectId(userId)}},
    //         {
    //             $lookup:{
    //                 localField: 'userId',
    //                 from:'user',
    //                 foreignField: "_id",
    //                 as: 'byUser',
    //             }
    //         },
    //         { $unwind: '$byUser' }, // [{.....}] ==> {.....}
    //         // {$match: {"reserve.roomId": ObjectId("room._id")}},
    //         // {
    //         //     $lookup: {
    //         //         from: 'order',
    //         //         foreignField: 'reserve.roomId',
    //         //         localField: 'room._id',
    //         //         as: 'order',
    //         //     },
    //         // }
    //     ])
    //       .toArray()
    //     console.log('query order service line 32 :>>', userOrders);
    //     // console.log('query order service line 33 :>>', room);
    //     return userOrders
    } catch (err) {
        logger.error('cannot find orders', err);
        throw err;
    }
}

async function getById(orderId) {
    console.log('getbyid order service line17 :>>', orderId);
    try {
        const collection = await dbService.getCollection('order')
        const order = await collection.findOne({ '_id': ObjectId(orderId) })
        return order
    } catch (err) {
        logger.error('cannot find order', err);
        throw err;
    }
}

async function add(order) {
    try {
        const collection = await dbService.getCollection('order')
        const addedOrder = await collection.insertOne(order)
        return addedOrder
    } catch (err) {
        logger.error('cannot insert order', err)
        throw err
    }
}



module.exports = {
    query,
    getById,
    add
}