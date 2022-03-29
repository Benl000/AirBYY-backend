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
    console.log('addedOrder order controller line31 :>>' , req.body);
    try {
        const addedOrder = await orderService.add(req.body)
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

