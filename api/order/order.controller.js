const orderService = require('./order.service.js')
const logger = require('../../service/logger.service');


// get orders list for admin only

async function getOrders(req,res) {
    try {
        const orders = await orderService.query()
        res.json(orders)
    } catch (err) {
        logger.error('Failed to get orders', err);
        res.status(500).send({ err: 'Failed to get orders' });
    }
}

// single order

async function getOrderById(req,res) {
try {
    const orderId = req.params.id
    const order = orderService.getById(orderId)
    
    res.json(order)
} catch (err) {
    logger.error('Failed to get order', err);
    res.status(500).send({ err: 'Failed to get order' });
}
}

async function addOrder(req,res) {
    try {
        // const user = req.session.user
        const orderToSave = req.body
        console.log('addOrder line 35 :>>', orderToSave);
        // orderToSave.userId = user._id 
        console.log('addedOrder order controller line36 :>>' , orderToSave);
        const addedOrder = await orderService.add(orderToSave)

          
        res.json(addedOrder)
    } catch (err) {
        logger.error('Failed to add order', err);
        // res.status(500).send({ err: 'Failed to add order' });
    }
}

module.exports = {
    getOrders,
    getOrderById,
    addOrder
}

